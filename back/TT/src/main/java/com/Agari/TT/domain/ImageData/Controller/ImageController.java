package com.Agari.TT.domain.ImageData.Controller;

import com.Agari.TT.domain.ImageData.Dto.ImageDto;
import com.Agari.TT.domain.ImageData.Service.ImageService;
import com.Agari.TT.domain.Response.CommonResponse;
import com.Agari.TT.domain.Response.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class ImageController {

    /**
     * @RequestPart 를 써서 MultiPartFile과 Dto를 파라미터로 사용하면 됨
     */

    @Autowired
    ResponseService responseService;

    @Autowired
    ImageService imageService;

    @PostMapping("/api/test")
    public CommonResponse test(@RequestPart MultipartFile file, @RequestPart ImageDto imageDto) throws IOException {
        imageService.save(file,imageDto);
        return new CommonResponse("성공");
    }

}
