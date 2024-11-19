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

- Run `npm run dc:up` to start the DynamoDB Local instance in Docker
- Run `npm run dynamo:admin` to see the contents of the local database at `http://localhost:8001`

To run the API locally on your machine, see the [Oriter API](./packages/api/README.md) documentation

### UI

See [Online Store UI](./packages/ui/README.md) documentation
