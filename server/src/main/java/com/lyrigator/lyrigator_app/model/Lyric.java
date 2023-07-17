package com.lyrigator.lyrigator_app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Lyric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String test;

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }
}
