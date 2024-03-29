export class AGCSData{
    Header: Header;
    Events: Event[];
    Footer: Footer;
}

export class Event{
    time: number;
    Image_40_s: string;
    Image_10_s_1: string;
    Image_10_s_2: string;
    Image_10_s_3: string;
    Image_10_s_4: string;
    checked:boolean;
    seizure:boolean;
    value:string;
}

export class Header{
    EEG_filename: string;
    Metric_1_image: string;
    Metric_2_image: string;
}

export class Footer{
    EEG_total_time_seconds: number;
    EEG_investigate_time_seconds: number;
    Total_review_percent: number
}

export class EEGFileList{
    fileList: EEGFile[];
}

export class EEGFile{
    name: string;
    processed:boolean;
    processing:boolean;
}
