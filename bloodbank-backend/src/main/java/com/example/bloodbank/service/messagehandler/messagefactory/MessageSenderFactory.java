package com.example.bloodbank.service.messagehandler.messagefactory;

import com.example.bloodbank.service.messagehandler.messagesender.MailSender;
import com.example.bloodbank.service.messagehandler.messagesender.MessageSender;
import com.example.bloodbank.service.messagehandler.messagesender.SMSSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

//should THIS be service?
@Service
public class MessageSenderFactory {

    private final JavaMailSender javaMailSender;

    public MessageSenderFactory(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public MessageSender create(String type){
        if(type.equals("Email")) {
            return new MailSender(javaMailSender);
        }else{
            return new SMSSender();
        }
    }
}
