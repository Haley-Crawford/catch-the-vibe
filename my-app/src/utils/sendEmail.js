import emailjs from 'emailjs-com'

const sendEmail = (name, title, date, location) => {
  emailjs.send('service_m3x03dy','template_ufc25qn', {
    name,
    title,
    message: `Don't forget! The ${title} event is ${date} in ${location}. Can't wait to see you there!`,
    time: new Date().toDateString()
  }, 'oF7Vy3g8D7JyX_WYZ')
  .then((res) => console.log('Email sent!', res))
  .catch((err) => console.error('Failed to send email', err))
}
export default sendEmail
