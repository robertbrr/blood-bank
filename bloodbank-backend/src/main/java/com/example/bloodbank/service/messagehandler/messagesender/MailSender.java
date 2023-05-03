package com.example.bloodbank.service.messagehandler.messagesender;

import com.example.bloodbank.service.messagehandler.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

//should this be @Service?
@Component
public class MailSender implements MessageSender{

    @Autowired
    private final JavaMailSender mailSender;

    public MailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    @Override
    public void send(Message message) {
        try {
            //message configuration
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom("mail@gmail.com");
            simpleMailMessage.setTo(message.getRecipient());
            simpleMailMessage.setSubject(message.getSubject());
            simpleMailMessage.setText(message.getText());
            //send message
            mailSender.send(simpleMailMessage);
        } catch (MailException exception) {
            exception.printStackTrace();
        }
    }
}
