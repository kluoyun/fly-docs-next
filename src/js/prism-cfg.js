/**
 * Copyright (c) XiaoK <xiaok@zxkxz.cn>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Prism.languages.cfg = {
    'comment': [
        {
            pattern: /#(.+)$/,
            greedy: true
        },
        {
            pattern: /;(.+)$/,
            greedy: true
        },
        {
            pattern: /;.*|\B\(.*?\)\B/,
            greedy: true
        }
    ],
    'string': {
        pattern: /"(?:""|[^"])*"/,
        greedy: true
    },
    'number': [
        {
            pattern: /(\-?\d+([\.,]\d+)?\b|\-?[\.,]\d+?)\b/,
            greedy: true
        },
        {
            pattern: /[\^~!]*P[A-Z]\d+|[\^~!]*(gpio)\d+/,
            greedy: true
        }
    ],
    'boolean': {
        pattern: /\b(true|false)\b/i,
        greedy: true
    },
    'keyword': [
        {
            pattern: /^\[[^\]]+\]/m,
            greedy: true
        },
        {
            pattern: /\b[GM]\d+(?:\.\d+)?\b/,
            greedy: true
        }
    ],
    'property': {
        pattern: /\b[A-Z]\b/,
        greedy: true
    },
    'checksum': {
        pattern: /(\*)\d+/,
        lookbehind: true,
        alias: 'number'
    },
    'known_config_block_name': {
        pattern: /\b(ad5206|adc_temperature|bed_mesh|bed_screws|bed_tilt|bltouch|board_pins|controller_fan|delayed_gcode|delta_calibrate|display|display_data|display_template|dotstar|dual_carriage|endstop_phase|extruder_stepper|extruder[1-9]?|fan|filament_switch_sensor|firmware_retraction|force_move|gcode_arcs|gcode_button|gcode_macro|hall_filament_width_sensor|heater_bed|heater_fan|heater_generic|homing_heaters|homing_override|idle_timeout|include|manual_stepper|mcp4018|mcp4451|mcp4728|mcu|menu|multi_pin|neopixel|output_pin|pause_resume|printer|probe|quad_gantry_level|replicape|respond|safe_z_home|samd_sercom|screws_tilt_adjust|servo|skew_correction|static_digital_output|stepper_(bed|arm|[abcdxy]|z[1-9]?)|sx1509|temperature_fan|temperature_sensor|thermistor|tsl1401cl_filament_width_sensor|verify_heater|virtual_sdcard|z_tilt)\b/i,
        greedy: true
    },
    'known_driver_type': {
        pattern: /\btmc(2130|2208|2209|2240|2660|5160)\b/i,
        greedy: true
    },
    'known_thermistor_type': {
        pattern: /\b(EPCOS 100K B57560G104F|ATC Semitec 104GT-2|NTC 100K beta 3950|Honeywell 100K 135-104LAG-J01|NTC 100K MGB18-104F39050L32)\b/i,
        greedy: true
    },
    'known_extruder_sensor_type': {
        pattern: /\b(MAX6675|MAX31855|MAX31856|MAX31865|PT100 INA826|AD595|AD8494|AD8495|AD8496|AD8497|PT1000|BME280)\b/i,
        greedy: true
    },
    'known_control_type': {
        pattern: /\b(watermark|pid)\b/i,
        greedy: true
    },
    'known_display_type': {
        pattern: /\b(hd44780|st7920|uc1701|ssd1306|sh1106)\b/i,
        greedy: true
    },
    'serial': [
        {
            pattern: /\/dev\/serial\/by-(id|path)\/[\d\w\/\-:\.]+/,
            greedy: true
        },
        {
            pattern: /\/dev\/tty\/[\d\w\/\-:\.]+/,
            greedy: true
        },
    ],
    'pin': [
        {
            pattern: /[\^~!]*(ar|analog)\d{1,2}|[\^~!]*(z:)?[a-z]{1,2}\d{1,2}(\.\d{1,2})?/i,
            greedy: true
        },
    ],
    'config_line': {
        pattern: /^\w+\s*[:=]\s*.+$/m,
        inside: {
            'variable': /^\w+/,
            'value': {
                pattern: /[:=]\s*.+$/,
                inside: {
                    'known_thermistor_type': /\b(EPCOS 100K B57560G104F|ATC Semitec 104GT-2|NTC 100K beta 3950|Honeywell 100K 135-104LAG-J01|NTC 100K MGB18-104F39050L32)\b/i,
                    'known_extruder_sensor_type': /\b(MAX6675|MAX31855|MAX31856|MAX31865|PT100 INA826|AD595|AD8494|AD8495|AD8496|AD8497|PT1000|BME280)\b/i,
                    'known_control_type': /\b(watermark|pid)\b/i,
                    'known_display_type': /\b(hd44780|st7920|uc1701|ssd1306|sh1106)\b/i,
                    'pin': /[\^~!]*(ar|analog)\d{1,2}|[\^~!]*(z:)?[a-z]{1,2}\d{1,2}(\.\d{1,2})?/i,
                    'serial': /\/dev\/serial\/by-(id|path)\/[\d\w\/\-:\.]+/,
                    'number': /\-?\d+([\.,]\d+)?\b|\-?[\.,]\d+?\b/,
                    'boolean': /\b(true|false)\b/i,
                    'comment': /#(.+)$/,
                }
            }
        }
    },
    'gcode_command': {
        pattern: /^\s*([GMTD])\d+/,
        inside: {
            'keyword': /^[GMTD]/
        }
    },
    'gcode_extended_command': {
        pattern: /^\s*(ABORT|ACCEPT|ACTIVATE_EXTRUDER|BED_MESH_CALIBRATE|BED_MESH_CLEAR|BED_MESH_MAP|BED_MESH_OUTPUT|BED_MESH_PROFILE|BED_SCREWS_ADJUST|BED_TILT_CALIBRATE|BLTOUCH_DEBUG|BLTOUCH_STORE|CALC_MEASURED_SKEW|CLEAR_PAUSE|DELTA_ANALYZE|DELTA_CALIBRATE|DUMP_TMC|ENDSTOP_PHASE_CALIBRATE|FIRMWARE_RESTART|FORCE_MOVE|GET_CURRENT_SKEW|GET_POSITION|GET_RETRACTION|HELP|MANUAL_PROBE|MANUAL_STEPPER|PAUSE|PID_CALIBRATE|PROBE|PROBE_ACCURACY|PROBE_CALIBRATE|QUAD_GANTRY_LEVEL|QUERY_ADC|QUERY_ENDSTOPS|QUERY_FILAMENT_SENSOR|QUERY_PROBE|RESPOND|RESTART|RESTORE_GCODE_STATE|RESUME|SAVE_CONFIG|SAVE_GCODE_STATE|SCREWS_TILT_CALCULATE|SET_DUAL_CARRIAGE|SET_EXTRUDER_STEP_DISTANCE|SET_FILAMENT_SENSOR|SET_GCODE_OFFSET|SET_GCODE_VARIABLE|SET_HEATER_TEMPERATURE|SET_IDLE_TIMEOUT|SET_KINEMATIC_POSITION|SET_LED|SET_PIN|SET_PRESSURE_ADVANCE|SET_RETRACTION|SET_SERVO|SET_SKEW|SET_STEPPER_ENABLE|SET_TMC_CURRENT|SET_TMC_FIELD|SET_VELOCITY_LIMIT|SKEW_PROFILE|STATUS|STEPPER_BUZZ|TESTZ|TUNING_TOWER|TURN_OFF_HEATERS|UPDATE_DELAYED_GCODE|Z_ENDSTOP_CALIBRATE|Z_TILT_ADJUST)\s/i,
        greedy: true
    },
    'gcode_parameter': {
        pattern: /\b[a-z]=/i,
        inside: {
            'parameter': /^[a-z]/i
        }
    },
    'gcode_macro_block': {
        pattern: /{[^}]*}/,
        inside: {
            'macro': /{[^}]*}/
        }
    }
};
