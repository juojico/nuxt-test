<template>
  <el-upload ref="upload" accept=".jpg,.png,.pdf,.jpeg" action="" :http-request="handleUploadFile" :before-upload="handleBeforeUpload">
    <div slot="file">
      <embed type="video/webm" :src="uploadSrc" width="100%" />
      <div class="el-upload-actions">
        <span @click="handleDownload">
          <i class="el-icon-download"></i>
        </span>
        <span @click="handleRemoveFle">
          <i class="el-icon-delete"></i>
        </span>
      </div>
    </div>
    <div v-if="!uploadSrc">
      <el-button size="small" type="primary">點擊上傳</el-button>
      <div slot="tip" class="el-upload__tip">只能上傳jpg/png/pdf文件，且不超過2MB</div>
    </div>
  </el-upload>
</template>
<script>
  import { fileDownload } from '~/utils';
  export default {
    name: 'PreviewUpload',
    props: {
      fileSrc: { type: String, default: '' },
      uploadFile: { type: Function },
      uploadCallback: { type: Function },
      beforeUpload: { type: Function },
    },
    data() {
      return {
        file: null,
        uploadSrc: '',
      };
    },
    watch: {
      fileSrc() {
        this.uploadSrc = this.fileSrc;
      },
    },
    methods: {
      handleUploadFile(payload) {
        this.file = payload.file;

        this.uploadFile(
          {
            file: payload.file,
          },
          this.getFileList,
        );
      },
      handleBeforeUpload(file) {
        if (file.size > 2 * 1024 * 1024) {
          this.$message.error('上傳檔案大小不能超過 2MB!');
          return false;
        }
        if (this.beforeUpload) this.beforeUpload();
        this.uploadSrc = URL.createObjectURL(file);
        return true;
      },
      handleRemoveFle() {
        this.uploadSrc = '';
        this.$refs.upload.clearFiles();
        this.$emit('deleteCallback', this.file);
      },
      handleDownload() {
        fileDownload(this.uploadSrc, this.file.name);
      },
      getFileList(src) {
        this.file.src = src;
        this.$emit('uploadCallback', this.file);
      },
    },
  };
</script>