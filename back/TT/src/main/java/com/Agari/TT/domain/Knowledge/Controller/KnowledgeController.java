package com.Agari.TT.domain.Knowledge.Controller;

import com.Agari.TT.domain.Knowledge.Service.KnowledgeService;
import com.Agari.TT.domain.Response.ResponseService;
import com.Agari.TT.domain.Response.SingleResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KnowledgeController {
    @Autowired
    ResponseService responseService;

    @Autowired
    KnowledgeService knowledgeService;



    @GetMapping("/api/todays-tip")
    public SingleResponse today_tip(){
        String msg = knowledgeService.getTodaysTip();

        return responseService.getSingleResponse(msg);
    }
}
