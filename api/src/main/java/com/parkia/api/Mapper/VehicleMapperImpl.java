package com.parkia.api.Mapper;

import com.parkia.api.Entity.Vehicle;
import com.parkia.api.request.VehicleRequest;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import org.springframework.stereotype.Component;

@Component
public class VehicleMapperImpl implements VehicleMapper {

    private MapperFactory mapperFactory;

    public VehicleMapperImpl() {
        this.mapperFactory = new DefaultMapperFactory.Builder().build();
        this.mapperFactory.classMap(VehicleRequest.class, Vehicle.class).
                mapNulls(false).
                mapNullsInReverse(false).
                byDefault().
                register();
    }

    public <S, D> D map(S s, Class<D> type) {
        return this.mapperFactory.getMapperFacade().map(s, type);
    }
}
