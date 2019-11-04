package com.parkia.api.Mapper;

public interface VehicleMapper {
    public <S, D> D map(S s, Class<D> type);
}
