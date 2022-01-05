class ImageUploadService {
  constructor() {
    this.cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    this.cloudApiKey = process.env.CLOUDINARY_API_KEY;
    this.imageUploadURL = `https://api.cloudinary.com/v1_1/drpteyub6/image/upload`;
  }

  async upload(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dclwja8y');
    const res = await fetch(this.imageUploadURL, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  }
}

export default ImageUploadService;
