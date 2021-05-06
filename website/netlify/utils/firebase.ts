import * as admin from 'firebase-admin'

export enum FirebaseKeys {
	Statistics = 'statistics',
	Trainings = 'trainings',
}
export function initializeApp(): admin.app.App {
	if (!admin.apps.length) {
		admin.initializeApp({
			databaseURL: 'https://mlnotify-default-rtdb.firebaseio.com/',
			credential: admin.credential.cert({
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				type: 'service_account',
				project_id: 'mlnotify',
				private_key_id: 'e931551a9c665795ddd827d3b55d00bbb13c65fe',
				private_key:
					'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC73z57a2Ia8oCf\nvbcpS4JkgrmXirUhv0P2SzO+kd2RfHW5IJ78q78PNLc6jbsASv4REMQBnlVEe8GV\nCRJ9B2Ir20gaGYM5uCVSMvBcH9ICPLEhSPy6PPa43dVx1kzNS+aNTcXW1M4gzBGY\nA64eyZSvFS03iXXXRHPbpeh38Oe3GRlCIQ1kPxCAcqExwsvMKyWW7YXby5I+zmI8\nhnwz5UrOWRt8+QTbyktlDUdYr9Io2mmoojEc6kLoQ8VxBgNVjPPr8Jf5zgJtGrpW\n/H1Pwi5NHQPrfsgS3gBUu/CRhhW/Z1C+mdOP2hdJcQOs2MDM5EXbNjJNbjKRZSj9\nDS9WN6r9AgMBAAECggEACDbjIv9Xe0kmIZXod8hC68Uhe0RH1jFoNdEk8oyrLOzN\nsun/uZmC0ZXi+w7uYb1lrXZXs6BqJwPoO215nvjfLH66gNWjvLbV/umWQ9jqVEm2\nDvgDgNsgiIW+iustUX6jloMThuioGJwDmutyRgtXUm5xGzAJ9H8cN7rh1ri0UPeX\nSplTiWIxpykvs4FOs5Qw9WgXAiecQ1XhcPFzZxB7BKQqTEtWKfwXu+8Df2wV2apj\ntDof0UsZerz19tki42h3bGjwybcICq2tfqj9j0L+EdUySA31cb2N9j3ny0SZo7mx\nF2Zf6mCrY5qQwJI8WE9QjCSjWfqS69jrWzlqzXTqmwKBgQDeazAaBtnQnbK22FM+\n64RsmGAeZBkWl/1+S6T/wPnjCO5C9Kx569W8ahtxaA0OJQdfimFafUAiIrx06Nvl\nv06adIFgCTJsayHqHegmSakjQrDTz/7w1l6VQGUTbTjuaGTNHlYAxi4iFiYiX8at\nFOasLVQRkFlSOcHuI+uK7xUCLwKBgQDYPMbcKaXWkYKvowFgk2IEkO3xNLosab16\nq8l3wdxYK7GbhIjlDSVoP+RaCG/oWnYjkb0mL+jGVKeMOimxQoBixNBbTdlLyw2/\ncRibysW0iCSeD5iLAztS+egrhWCX1Tc9iBoS9ICD8G0y8cR+bgECB9Su0kLweZm9\n5SruV4a2kwKBgQCh5pJQD7aTlYcWc6c9AMEXL1+gH6rneGGMglGr3XPIYKLW2DWI\nVjPx/6bUSTJfnnKciCVPciax8mkODMasmTIFWlMmbetnYiCAw55N6IaW5R/EPv5L\nny+gIwywNGwhlpnxeWiPDbNdGpRNpzv+l11F7YTpeBKcuPBCgaEeM+Qt/wKBgEJv\nUc18gjYNGLCrjRXF0jyC5ofP4k8Y4Z0ZwFkp12/DZNrZ+lEdG9wOnTLIGtGxUVCW\nSx27ZHHiumNLz1lljBpMS5NxtIwjw4KI1b2vq9ROa6mgMwaqpIRWwWz1mnqriEBA\nW3ptYjqnGHWpb+xEEc006LQZZ3WIdqKwEOOPQpU/AoGARo3hk26lprSZGfgE9LAc\nul2q9CIcPoYWSUqOnnPlMQIyvsUs5EeS86H5OCWnizz+UbvKNlGaRe8FdOjObEsE\nzMZdp99Oci1LGQIakv3fovxAy1DpaUfAqAl+OaTEpatr4V4XQP2WjuvXc/o0H8q0\nJMruWNUa/6BAam9CrZAGmuY=\n-----END PRIVATE KEY-----\n',
				client_email: 'firebase-adminsdk-7tmzb@mlnotify.iam.gserviceaccount.com',
				client_id: '109589242022278133604',
				auth_uri: 'https://accounts.google.com/o/oauth2/auth',
				token_uri: 'https://oauth2.googleapis.com/token',
				auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
				client_x509_cert_url:
					'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7tmzb%40mlnotify.iam.gserviceaccount.com',
			}),
		})
	}

	return admin.app()
}
