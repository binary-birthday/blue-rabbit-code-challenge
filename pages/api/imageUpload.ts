import aws from 'aws-sdk';

export default async function handler(req, res) {
  try {
	  const s3 = new aws.S3({
	    accessKeyId: process.env.APP_AWS_ACCESS_KEY,
	    secretAccessKey: process.env.APP_AWS_SECRET_KEY,
	    region: process.env.APP_AWS_REGION,
	  })
	  aws.config.update({
		  accessKeyId: process.env.APP_AWS_ACCESS_KEY,
	    secretAccessKey: process.env.APP_AWS_SECRET_KEY,
	    region: process.env.APP_AWS_REGION,
	    signatureVersion: 'v4',
	  })
	  const post = await s3.createPresignedPost({
	    Bucket: process.env.APP_AWS_BUCKET_NAME,
	    Fields: {
	      key: req.query.file,
	    },
	    Expires: 60, // seconds
	    Conditions: [
	      ['content-length-range', 0, 5048576], // up to 1 MB
	    ],
    })
	  return res.status(200).json(post)
  } catch (e) {
		console.error(e)
  }
}