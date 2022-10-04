radio.onReceivedNumber(function (receivedNumber) {
    if (debug == 1) {
        serial.writeValue("message", receivedNumber)
    }
    ServoNumber = -1
    message = receivedNumber
    for (let i = 0; i <= 5; i++) {
        messages[i] = message % 10
        message = Math.trunc(message / 10)
        if (messages[i] == 1) {
            if (servo_angles[i] < SERVO_RANGES_MAX[i]) {
                servo_angles[i] = servo_angles[i] + SERVO_ANGLE_STEPS[i]
                ServoNumber = i
                basic.showLeds(`
                    . . # . .
                    . # # # .
                    # . # . #
                    . . # . .
                    . . # . .
                    `)
            }
        } else if (messages[i] == 9) {
            if (servo_angles[i] > SERVO_RANGES_MIN[i]) {
                servo_angles[i] = servo_angles[i] - SERVO_ANGLE_STEPS[i]
                ServoNumber = i
                basic.showLeds(`
                    . . # . .
                    . . # . .
                    # . # . #
                    . # # # .
                    . . # . .
                    `)
            }
        }
    }
})
input.onButtonPressed(Button.A, function () {
    servo_calibration()
})
function MoveServo () {
    if (ServoNumber == 0) {
        pins.servoWritePin(AnalogPin.P9, servo_angles[0])
    } else if (ServoNumber == 1) {
        pins.servoWritePin(AnalogPin.P12, servo_angles[1])
    } else if (ServoNumber == 2) {
        pins.servoWritePin(AnalogPin.P13, servo_angles[2])
    } else if (ServoNumber == 3) {
        pins.servoWritePin(AnalogPin.P14, servo_angles[3])
    } else if (ServoNumber == 4) {
        pins.servoWritePin(AnalogPin.P15, servo_angles[4])
    } else if (ServoNumber == 5) {
        pins.servoWritePin(AnalogPin.P16, servo_angles[5])
    }
    s3count += 1
    if (s3count % 10000 == 0) {
        pins.servoWritePin(AnalogPin.P14, servo_angles[3])
    }
}
input.onButtonPressed(Button.B, function () {
    for (let i = 0; i <= 4; i++) {
        servo_angles[i] = Math.abs(90)
    }
    servo_angles[5] = Math.abs(135)
    pins.servoWritePin(AnalogPin.P9, servo_angles[0])
    basic.pause(40)
    pins.servoWritePin(AnalogPin.P12, servo_angles[1])
    basic.pause(40)
    pins.servoWritePin(AnalogPin.P13, servo_angles[2])
    basic.pause(40)
    pins.servoWritePin(AnalogPin.P14, servo_angles[3])
    basic.pause(40)
    pins.servoWritePin(AnalogPin.P15, servo_angles[4])
    basic.pause(40)
    pins.servoWritePin(AnalogPin.P16, servo_angles[5])
})
function servo_calibration () {
    pins.analogSetPeriod(AnalogPin.P9, 20000)
    pins.analogSetPeriod(AnalogPin.P11, 20000)
    pins.analogSetPeriod(AnalogPin.P12, 20000)
    pins.analogSetPeriod(AnalogPin.P13, 20000)
    pins.analogSetPeriod(AnalogPin.P14, 20000)
    pins.analogSetPeriod(AnalogPin.P15, 20000)
    pins.analogSetPeriod(AnalogPin.P16, 20000)
    for (let i = 0; i <= 4; i++) {
        servo_angles[i] = Math.abs(90)
    }
    servo_angles[5] = Math.abs(135)
    basic.showLeds(`
        # # # . #
        # # # # #
        # # # . #
        . . . . .
        . . . . .
        `)
    pins.servoWritePin(AnalogPin.P9, 80)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P9, 100)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P9, servo_angles[0])
    basic.pause(200)
    basic.showLeds(`
        # # # . #
        # # # # #
        # # # . #
        . . . . .
        # . . . .
        `)
    pins.servoWritePin(AnalogPin.P12, 80)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P12, 100)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P12, servo_angles[1])
    basic.pause(200)
    basic.showLeds(`
        # # # . #
        # # # # #
        # # # . #
        . . . . .
        . # . . .
        `)
    pins.servoWritePin(AnalogPin.P13, 80)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P13, 100)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P13, servo_angles[2])
    basic.pause(200)
    basic.showLeds(`
        # # # . #
        # # # # #
        # # # . #
        . . . . .
        . . # . .
        `)
    pins.servoWritePin(AnalogPin.P14, 80)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P14, 100)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P14, servo_angles[3])
    basic.pause(200)
    basic.showLeds(`
        # # # . #
        # # # # #
        # # # . #
        . . . . .
        . . . # .
        `)
    pins.servoWritePin(AnalogPin.P15, 80)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P15, 100)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P15, servo_angles[4])
    basic.pause(200)
    basic.showLeds(`
        # # # . #
        # # # # #
        # # # . #
        . . . . .
        . . . . #
        `)
    pins.servoWritePin(AnalogPin.P16, 80)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P16, 100)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P16, servo_angles[5])
    basic.pause(200)
    basic.showLeds(`
        # # # . #
        # # # # #
        # # # . #
        . . . . .
        # # # # #
        `)
}
let s3count = 0
let message = 0
let ServoNumber = 0
let SERVO_ANGLE_STEPS: number[] = []
let SERVO_RANGES_MAX: number[] = []
let SERVO_RANGES_MIN: number[] = []
let servo_angles: number[] = []
let messages: number[] = []
let debug = 0
debug = 1
servo_calibration()
basic.showLeds(`
    . # # # .
    # . . # .
    # . # . #
    # . . . .
    # # . . .
    `)
radio.setGroup(123)
messages = [
0,
0,
0,
0,
0,
0
]
servo_angles = [
90,
90,
90,
90,
90,
90
]
SERVO_RANGES_MIN = [
0,
0,
0,
0,
0,
35
]
SERVO_RANGES_MAX = [
180,
180,
180,
180,
180,
120
]
SERVO_ANGLE_STEPS = [
10,
15,
15,
10,
5,
15
]
basic.forever(function () {
    MoveServo()
    if (debug == 1) {
        serial.writeValue("servonumber", ServoNumber)
        serial.writeNumbers([
        servo_angles[0],
        servo_angles[1],
        servo_angles[2],
        servo_angles[3],
        servo_angles[4],
        servo_angles[5]
        ])
    }
})
