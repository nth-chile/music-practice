// Convert Hertz to note

const hzToNote = (hz: number, specifyOctave?: boolean): string | null => {
    let note;

    if (typeof hz !== 'number') {
        return null;
    }

    switch (true) {
        case hz < 16.835:
            note = 'C0';
            break;
        case hz < 17.835:
            note = 'Db0';
            break;
        case hz < 18.9:
            note = 'D0';
            break;
        case hz < 20.025:
            note = 'Eb0';
            break;
        case hz < 21.215:
            note = 'E0';
            break;
        case hz < 22.475:
            note = 'F0';
            break;
        case hz < 23.810000000000002:
            note = 'Gb0';
            break;
        case hz < 25.23:
            note = 'G0';
            break;
        case hz < 26.73:
            note = 'Ab0';
            break;
        case hz < 28.32:
            note = 'A0';
            break;
        case hz < 30.005000000000003:
            note = 'Bb0';
            break;
        case hz < 31.785000000000004:
            note = 'B0';
            break;
        case hz < 33.675:
            note = 'C1';
            break;
        case hz < 35.68:
            note = 'Db1';
            break;
        case hz < 37.8:
            note = 'D1';
            break;
        case hz < 40.045:
            note = 'Eb1';
            break;
        case hz < 42.425:
            note = 'E1';
            break;
        case hz < 44.95:
            note = 'F1';
            break;
        case hz < 47.625:
            note = 'Gb1';
            break;
        case hz < 50.455:
            note = 'G1';
            break;
        case hz < 53.455:
            note = 'Ab1';
            break;
        case hz < 56.635000000000005:
            note = 'A1';
            break;
        case hz < 60.005:
            note = 'Bb1';
            break;
        case hz < 63.575:
            note = 'B1';
            break;
        case hz < 67.35499999999999:
            note = 'C2';
            break;
        case hz < 71.36:
            note = 'Db2';
            break;
        case hz < 75.6:
            note = 'D2';
            break;
        case hz < 80.095:
            note = 'Eb2';
            break;
        case hz < 84.86:
            note = 'E2';
            break;
        case hz < 89.905:
            note = 'F2';
            break;
        case hz < 95.25:
            note = 'Gb2';
            break;
        case hz < 100.91499999999999:
            note = 'G2';
            break;
        case hz < 106.91499999999999:
            note = 'Ab2';
            break;
        case hz < 113.27000000000001:
            note = 'A2';
            break;
        case hz < 120.005:
            note = 'Bb2';
            break;
        case hz < 127.14:
            note = 'B2';
            break;
        case hz < 134.7:
            note = 'C3';
            break;
        case hz < 142.71:
            note = 'Db3';
            break;
        case hz < 151.195:
            note = 'D3';
            break;
        case hz < 160.185:
            note = 'Eb3';
            break;
        case hz < 169.71:
            note = 'E3';
            break;
        case hz < 179.805:
            note = 'F3';
            break;
        case hz < 190.5:
            note = 'Gb3';
            break;
        case hz < 201.825:
            note = 'G3';
            break;
        case hz < 213.825:
            note = 'Ab3';
            break;
        case hz < 226.54000000000002:
            note = 'A3';
            break;
        case hz < 240.01:
            note = 'Bb3';
            break;
        case hz < 254.285:
            note = 'B3';
            break;
        case hz < 269.405:
            note = 'C4';
            break;
        case hz < 285.42:
            note = 'Db4';
            break;
        case hz < 302.395:
            note = 'D4';
            break;
        case hz < 320.38:
            note = 'Eb4';
            break;
        case hz < 339.43:
            note = 'E4';
            break;
        case hz < 359.61:
            note = 'F4';
            break;
        case hz < 380.995:
            note = 'Gb4';
            break;
        case hz < 403.65:
            note = 'G4';
            break;
        case hz < 427.65:
            note = 'Ab4';
            break;
        case hz < 453.08000000000004:
            note = 'A4';
            break;
        case hz < 480.02:
            note = 'Bb4';
            break;
        case hz < 508.565:
            note = 'B4';
            break;
        case hz < 538.81:
            note = 'C5';
            break;
        case hz < 570.85:
            note = 'Db5';
            break;
        case hz < 604.79:
            note = 'D5';
            break;
        case hz < 640.75:
            note = 'Eb5';
            break;
        case hz < 678.855:
            note = 'E5';
            break;
        case hz < 719.225:
            note = 'F5';
            break;
        case hz < 761.99:
            note = 'Gb5';
            break;
        case hz < 807.3:
            note = 'G5';
            break;
        case hz < 855.3050000000001:
            note = 'Ab5';
            break;
        case hz < 906.165:
            note = 'A5';
            break;
        case hz < 960.05:
            note = 'Bb5';
            break;
        case hz < 1017.135:
            note = 'B5';
            break;
        case hz < 1077.615:
            note = 'C6';
            break;
        case hz < 1141.6950000000002:
            note = 'Db6';
            break;
        case hz < 1209.585:
            note = 'D6';
            break;
        case hz < 1281.51:
            note = 'Eb6';
            break;
        case hz < 1357.71:
            note = 'E6';
            break;
        case hz < 1438.4450000000002:
            note = 'F6';
            break;
        case hz < 1523.98:
            note = 'Gb6';
            break;
        case hz < 1614.6:
            note = 'G6';
            break;
        case hz < 1710.6100000000001:
            note = 'Ab6';
            break;
        case hz < 1812.33:
            note = 'A6';
            break;
        case hz < 1920.095:
            note = 'Bb6';
            break;
        case hz < 2034.2649999999999:
            note = 'B6';
            break;
        case hz < 2155.23:
            note = 'C7';
            break;
        case hz < 2283.3900000000003:
            note = 'Db7';
            break;
        case hz < 2419.17:
            note = 'D7';
            break;
        case hz < 2563.02:
            note = 'Eb7';
            break;
        case hz < 2715.425:
            note = 'E7';
            break;
        case hz < 2876.895:
            note = 'F7';
            break;
        case hz < 3047.96:
            note = 'Gb7';
            break;
        case hz < 3229.2:
            note = 'G7';
            break;
        case hz < 3421.2200000000003:
            note = 'Ab7';
            break;
        case hz < 3624.6549999999997:
            note = 'A7';
            break;
        case hz < 3840.19:
            note = 'Bb7';
            break;
        case hz < 4068.54:
            note = 'B7';
            break;
        case hz < 4310.465:
            note = 'C8';
            break;
        case hz < 4566.775:
            note = 'Db8';
            break;
        case hz < 4838.33:
            note = 'D8';
            break;
        case hz < 5126.035:
            note = 'Eb8';
            break;
        case hz < 5430.844999999999:
            note = 'E8';
            break;
        case hz < 5753.78:
            note = 'F8';
            break;
        case hz < 6095.92:
            note = 'Gb8';
            break;
        case hz < 6458.405000000001:
            note = 'G8';
            break;
        case hz < 6842.4400000000005:
            note = 'Ab8';
            break;
        case hz < 7249.3099999999995:
            note = 'A8';
            break;
        case hz < 7680.37:
            note = 'Bb8';
            break;
        case hz > 7680.37:
            note = 'B8';
            break;
        // no default
    }

    if (note && !specifyOctave) {
        note = note.replace(/[0-9]/g, '');
    }

    return note || null;
};

export default hzToNote;
