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

variable "hosted_zone_id" {
  description = "Route53 hosted zone ID for domain_name, if it already exists outside this stack. Leave null to create a new zone."
  type        = string
  default     = null
}

variable "tags" {
  description = "Common resource tags"
  type        = map(string)
  default = {
    Project   = "portfolio"
    ManagedBy = "terraform"
  }
}
