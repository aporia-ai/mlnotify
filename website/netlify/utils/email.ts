import sgMail from '@sendgrid/mail'

import { createTrainingEndEmail } from './emails/training-end'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export async function sendTrainingEndedEmail(to: string[], { trainingId }: { trainingId: string }) {
	return await sgMail.send({
		to,
		from: { email: 'mlnotify@aporia.com', name: 'ML Notify' },
		subject: `MLNotify | Training #${trainingId} ended`,
		text: `Your training ended`,
		html: createTrainingEndEmail({ trainingId }),
	})
}
