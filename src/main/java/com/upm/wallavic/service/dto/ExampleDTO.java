package com.upm.wallavic.service.dto;

import java.io.Serializable;

/**
 * Created by Victor on 23/01/2017.
 */
public class ExampleDTO implements Serializable{

    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ExampleDTO(String text) {
        this.text = text;
    }

    public ExampleDTO() {
    }

    @Override
    public String toString() {
        return "ExampleDTO{" +
            "text='" + text + '\'' +
            '}';
    }
}
