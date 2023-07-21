package com.lyrigator.lyrigator_app.openAi;

import com.lyrigator.lyrigator_app.model.Structure;

import java.util.List;

public record Prompt(String description, String genre, String mood, List<Structure> structure) {

}
