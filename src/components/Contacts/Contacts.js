import { useHistory } from 'react-router';

import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';

import * as messages from '../../shared/messages';
import * as emailjsProps from '../../settings/emailjsProps';

import './Contacts.css';
const Contacts = (props) => {
    
    let history = useHistory();

    function handleSendEmail(e) {
        e.preventDefault();
        emailjs.sendForm(emailjsProps.serviceID, emailjsProps.templateID, e.target, emailjsProps.userID)
            .then(() => {
                toast.success(messages.CONTACT_MESSAGE_SUCCESS);
                history.push('/');
            }).catch(err => console.log(err));
    }

    return (
        <div className="container">
            <form onSubmit={handleSendEmail}>
                <input type="hidden" id="site" name="site" value="Auth Template App"/>
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name.." />

                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="Your last name.." />

                <label>Email</label>
                <input type="text" id="email" name="email" placeholder={props.userEmail} value={props.userEmail} disabled="disabled"/>

                <label htmlFor="subject">Subject</label>
                <textarea className="container__textarea" id="subject" name="subject" placeholder="Write something.."></textarea>

                <input className="primarybtn" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Contacts;