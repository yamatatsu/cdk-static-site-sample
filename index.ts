import cdk = require("@aws-cdk/cdk");
import s3 = require("@aws-cdk/aws-s3");

class MyStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string) {
    super(parent, name);

    new s3.Bucket(this, "MyBucket", {
      bucketName: "bucket-tte-baketsu-no-koto-nandane"
    });
  }
}

const app = new cdk.App();

new MyStack(app, "CdkAample");
