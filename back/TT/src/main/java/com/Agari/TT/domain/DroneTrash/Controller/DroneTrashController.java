package com.Agari.TT.domain.DroneTrash.Controller;

import com.Agari.TT.domain.DroneTrash.Dto.DroneRequestDto;
import com.Agari.TT.domain.DroneTrash.Dto.LocationDto;
import com.Agari.TT.domain.DroneTrash.Dto.MapDto;
import com.Agari.TT.domain.DroneTrash.Service.DroneTrashService;
import com.Agari.TT.domain.Member.Entity.MemberDetail;
import com.Agari.TT.domain.Response.CommonResponse;
import com.Agari.TT.domain.Response.ListResponse;
import com.Agari.TT.domain.Response.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class DroneTrashController {

    @Autowired
    DroneTrashService droneTrashService;

    @Autowired
    ResponseService responseService;

    /**
     * 드론 이미지 업로드
     */
    @PostMapping("/api/drone/upload")
    public CommonResponse droneImageUpload(@RequestPart List<MultipartFile> files,
                                           @RequestPart List<LocationDto> locations,
                                           @AuthenticationPrincipal MemberDetail memberDetail) throws IOException {
        droneTrashService.upload(files,locations,memberDetail.getUsername());

        return new CommonResponse("성공");
    }

    @GetMapping("/api/map")
    public ListResponse trackerMap(){
        List<MapDto> mapDtos = droneTrashService.getTrashMap();

        return responseService.getListResponse(mapDtos);
    }
}
