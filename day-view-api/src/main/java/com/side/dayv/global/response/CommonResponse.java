package com.side.dayv.global.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommonResponse<T> {

    private T data;

    public CommonResponse(T data){
        this.data = data;
    }
}
