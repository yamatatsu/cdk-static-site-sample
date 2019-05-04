import cdk = require('@aws-cdk/cdk')
import cloudfront = require('@aws-cdk/aws-cloudfront')
import s3 = require('@aws-cdk/aws-s3')
import s3deploy = require('@aws-cdk/aws-s3-deployment')

class MyStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string) {
    super(parent, name)

    const siteBucket = new s3.Bucket(this, 'MyBucket', {
      bucketName: 'bucket-tte-baketsu-no-koto-nandane',
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    })

    new s3deploy.BucketDeployment(this, 'MySiteDeployment', {
      source: s3deploy.Source.asset('./dist'),
      destinationBucket: siteBucket,
    })

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'MyWebDistribution',
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: siteBucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      },
    )

    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
    })
    new cdk.CfnOutput(this, 'DomainName', {
      value: distribution.domainName,
    })
  }
}

const app = new cdk.App()

new MyStack(app, 'CdkAample')
