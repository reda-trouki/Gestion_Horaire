package com.master.models;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ModuleHours {
    private String moduleName;
    private Long totalHours;


}
