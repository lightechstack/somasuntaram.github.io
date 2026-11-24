variable "aws_region" {
  description = "Primary AWS region for non-CloudFront resources"
  type        = string
  default     = "ap-south-1"
}

variable "domain_name" {
  description = "Apex domain for the portfolio, e.g. somasuntaram.dev"
  type        = string
}

variable "www_subdomain" {
  description = "Whether to also provision www.<domain_name> and redirect to apex"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Common resource tags"
  type        = map(string)
  default = {
    Project   = "portfolio"
    ManagedBy = "terraform"
  }
}
