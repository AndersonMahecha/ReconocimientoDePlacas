package com.parkia.api.controller;

import com.parkia.api.Entity.Vehicle;
import com.parkia.api.Mapper.VehicleMapper;
import com.parkia.api.request.VehicleRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/vehiculos")
public class VehicleController {

    private final VehicleMapper vehicleMapper;

    @Autowired
    public VehicleController(VehicleMapper vehicleMapper) {
        this.vehicleMapper = vehicleMapper;
    }

    @RequestMapping(value = "/registrar", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
    String RegistrarVehiculo(@NotNull @Valid @RequestBody VehicleRequest request) {

        return vehicleMapper.map(request, Vehicle.class).getPlaca();
    }
}