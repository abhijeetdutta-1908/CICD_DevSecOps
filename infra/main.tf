terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ------------------------------------------------------------- Create ECR Repository----------------------------------------------------
# tfsec:ignore:aws-ecr-repository-customer-key
resource "aws_ecr_repository" "app_repo" {
  name = var.ecr_repo_name

  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
  force_delete = true   
}

# ----------------------------------------------------------------------- Create VPC for EKS---------------------------------------------------------
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.9.0"

  name = "eks-vpc"
  cidr = "10.0.0.0/16"
  azs  = slice(data.aws_availability_zones.available.names, 0, 3)
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true
  enable_flow_log = true

  create_flow_log_cloudwatch_log_group = true
  create_flow_log_cloudwatch_iam_role  = true
}

data "aws_availability_zones" "available" {}

#------------------------------------------------------------------------Create EKS Cluster-----------------------------------------------------
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.10.0"

  cluster_name    = var.cluster_name
  cluster_version = "1.30"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  # Enable Public and Private endpoint access
  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = true
  cluster_endpoint_public_access_cidrs = ["49.42.188.39/32"]

  cluster_enabled_log_types = ["api", "audit", "authenticator", "controllerManager", "scheduler"]
 
  access_entries = {
    ClusterAdmin = {
      principal_arn = "arn:aws:iam::520864642809:user/sit-user"
      policy_associations = {
        Admin = {
          policy_arn = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy",
          access_scope = {
            type = "cluster"
          }
        }
      }
    }
  }
  # ---------------------------------------------------

  eks_managed_node_groups = {
    one = {
      min_size     = 1
      max_size     = 2
      desired_size = 1
      instance_types = ["t3.medium"]
    }
  }
}