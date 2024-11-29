# Online Store

This is the application code for Online Store.

## Requirements

- Docker
- AWS CLI
- You also need to add the `online-store` profile to your local AWS configuration

### Example

```
[online_store]
    aws_access_key_id = <YOUR AWS ACCESS KEY ID>
    aws_secret_access_key = <YOUR AWS SECRET ACCESS KEY>
```

## Terraform

These commands **will affect production** so be sure you know what you're doing.

- Run `terraform init` to initialize your Terraform project.
- Run `terraform apply` to create the resources.
- Run `terraform destroy` to destroy all resources.

## Deploying

Deploy runs with a GitHub Workflow located in `.github/workflows`

## Local Development

### API

To run the API locally on your machine, see the [Online Store API](./api/README.md) documentation

### UI

To run the UI locally on your machine, see the [Online Store UI](./ui/README.md) documentation
