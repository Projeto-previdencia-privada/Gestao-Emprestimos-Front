import {useState} from "react";

function Upload() {
    const [preview, setPreview] = useState('') ;
    const [fileName, setFileName] = useState("Selecione o arquivo");

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = new FileReader;
        file.onload = () => {
            setFileName(event.target.files![0].name)
            setPreview(file.result as string);
        }
        file.readAsDataURL(event.target.files![0]);
    }

    return (
        <div className="form-upload">
            <label className="upload-label"><span>Logo da instituição</span></label>
            <input className="upload-input" id="single-file" type="file" name={'image'} onChange={onChange}/>
            <label className={'upload-wrapper'} htmlFor={'single-file'}>
                <i className={'fas fa-upload'}></i>
                <span className={'upload-text'}>{fileName}</span></label>
            { preview != null ? <img className={'upload-image'} src={preview}/> : <></>}
            <div className="upload-list"></div>
        </div>
    )
}

export default Upload;