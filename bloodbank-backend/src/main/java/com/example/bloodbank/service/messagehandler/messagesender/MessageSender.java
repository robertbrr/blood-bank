package com.example.bloodbank.service.messagehandler.messagesender;

import com.example.bloodbank.service.messagehandler.Message;

public interface MessageSender {
    void send(Message message);
}
