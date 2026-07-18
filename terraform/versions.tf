terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    # Fill in after bootstrap (see terraform/bootstrap/README.md).
    # bucket         = "<your-tf-state-bucket>"
    # key            = "portfolio/terraform.tfstate"
    # region         = "ap-south-1"
    # dynamodb_table = "<your-tf-lock-table>"
    # encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}

# ACM certs for CloudFront must be issued in us-east-1 regardless of the
# stack's primary region. Keep this explicit rather than relying on defaults.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
