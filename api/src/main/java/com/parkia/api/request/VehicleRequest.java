package com.parkia.api.request;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class VehicleRequest {
    @NotBlank
    @Size(min = 5, max = 6)
    private String placa;
    @NotBlank
    private String tipo;
    @Valid
    private Propietario propietario;

    public VehicleRequest() {
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Propietario getPropietario() {
        return propietario;
    }

    public void setPropietario(Propietario propietario) {
        this.propietario = propietario;
    }

    private class Propietario {
        @NotBlank
        @Size(min = 1, max = 20)
        private String nombre;
        @NotBlank
        @Size(min = 1, max = 20)
        private String apellido;
        @NotBlank
        @Size(min = 1, max = 20)
        private String documendo;
        @NotBlank
        @Size(min = 1, max = 20)
        private String telefono;
        @NotBlank
        @Size(min = 1, max = 50)
        private String direccion;
        @NotBlank
        @Size(min = 1, max = 20)
        private String documento;

        public Propietario() {
        }

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public String getApellido() {
            return apellido;
        }

        public void setApellido(String apellido) {
            this.apellido = apellido;
        }

        public String getDocumendo() {
            return documendo;
        }

        public void setDocumendo(String documendo) {
            this.documendo = documendo;
        }

        public String getTelefono() {
            return telefono;
        }

        public void setTelefono(String telefono) {
            this.telefono = telefono;
        }

        public String getDireccion() {
            return direccion;
        }

        public void setDireccion(String direccion) {
            this.direccion = direccion;
        }

        public String getDocumento() {
            return documento;
        }

        public void setDocumento(String documento) {
            this.documento = documento;
        }

        @Override
        public String toString() {
            return "Propietario{" +
                    "nombre='" + nombre + '\'' +
                    ", apellido='" + apellido + '\'' +
                    ", documendo='" + documendo + '\'' +
                    ", telefono='" + telefono + '\'' +
                    ", direccion='" + direccion + '\'' +
                    ", documento='" + documento + '\'' +
                    '}';
        }
    }
}
