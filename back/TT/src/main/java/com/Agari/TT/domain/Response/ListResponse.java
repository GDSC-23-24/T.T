package com.Agari.TT.domain.Response;

import lombok.Getter;

import java.util.List;

@Getter
public class ListResponse<T> extends CommonResponse {
    List<T> datalist;
}
