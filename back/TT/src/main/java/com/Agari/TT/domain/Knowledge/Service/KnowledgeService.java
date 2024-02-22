package com.Agari.TT.domain.Knowledge.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class KnowledgeService {

    String[] messages = {
            "Approximately 8 million tons of plastic waste flow into the oceans every year.",
            "Around 1 million marine species are threatened by marine debris.",
            "Over 80% of the plastic in the oceans comes from land-based sources.",
            "More than 50% of marine debris is single-use plastic products.",
            "It takes about 450 years for a plastic bottle to completely decompose.",
            "Every day, approximately 5 million straws are used and discarded worldwide.",
            "Marine debris can reduce the tourist value of beaches by up to 40%.",
            "Marine debris is directly linked to environmental issues like sea level rise and climate change.",
            "About 90% of marine animals have ingested plastic at least once in their lives.",
            "The economic loss due to marine debris amounts to several billion dollars annually.",
            "The most common type of waste found on beaches is cigarette butts.",
            "Small plastic fragments can be mistaken for plankton and ingested by fish.",
            "Marine debris affects not only the ocean but also beaches and even deep-sea environments.",
            "Every year, about 1 million sea birds die from marine debris.",
            "Plastic waste reduces the biodiversity of marine ecosystems.",
            "Global cooperation is required to solve the marine debris problem.",
            "The majority of non-recycled plastic products eventually end up in the ocean.",
            "Plastic can release harmful chemicals while remaining in the marine environment.",
            "Marine debris also affects the oxygen production essential to marine ecosystems.",
            "Marine debris poses a risk to human health by polluting beaches and bathing areas.",
            "Legal measures are being implemented worldwide to reduce marine debris.",
            "Thousands of marine mammals die each year due to marine debris.",
            "Marine debris decreases fish populations and affects the marine food chain.",
            "Plastic waste is one of the main causes of debris found in the ocean.",
            "Recycling can reduce the problem of marine debris.",
            "Small efforts by everyone can solve the marine debris problem.",
            "Marine debris is polluting beaches and oceans worldwide.",
            "Collecting marine debris is an important first step in protecting marine ecosystems.",
            "The ocean is one of our greatest resources, and we must protect it.",
            "Efforts must be made to find sustainable solutions to the marine debris problem."
    };

    public String getTodaysTip() {
        Random random = new Random();
        int index = random.nextInt(messages.length);
        return messages[index];
    }
}
