<template>
  <div>
    <PersonalCard :title="'上傳檔案'">
      <div slot="content">
        <el-upload action="" :file-list="resumeFiles" accept="application/pdf" :http-request="onUploadUserFile" :before-upload="beforeUploadUserFile">
          <el-button size="small" type="primary">點擊上傳</el-button>
          <div slot="tip" class="el-upload__tip">只允許pdf文件，且不超過2MB</div>
          <div slot="file" slot-scope="{file}">
            <embed type="video/webm" :src="file.url" width="100%" />
            <div class="el-upload-actions">
              <span @click="handleDownload(file)">
                <i class="el-icon-download"></i>
              </span>
              <span @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </div>
          </div>
        </el-upload>
      </div>
    </PersonalCard>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import PersonalCard from '../PersonalCard';
  import { fileDownload } from '~/utils';
  export default {
    name: 'ContactInfo',
    components: { PersonalCard },
    props: {
      title: { type: String, default: '' },
    },
    data() {
      return {
        resumeFiles: [],
      };
    },
    computed: {
      ...mapGetters('personal', ['isEdit']),
    },
    methods: {
      handleDownload(file) {
        fileDownload(file.url, file.name);
      },
      beforeUploadUserFile(file) {
        const isPDF = file.type === 'application/pdf';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPDF) {
          this.$message.error('檔案只允許pdf');
        }
        if (!isLt2M) {
          this.$message.error('檔案大小不可超過2MB!');
        }
        return isPDF && isLt2M;
      },
      handleRemove(file) {
        if (file.status === 'ready') {
          return true;
        }
        this.$confirm(`確定移除 ${file.name}？`)
          .then(() => {
            try {
              let id = file.response !== undefined ? file.response.id : file.id;
              this.$api('removeUserFile', { id }).then(() => {
                this.loadUserFiles();
                this.$message.success('删除成功');
              });
            } catch (e) {
              this.$message.error('移除檔案失敗');
              console.log(e);
            }
          })
          .catch(() => {
            this.$message.info('已取消删除');
          });
        return false;
      },
      onUploadUserFile(event) {
        const { file } = event;
        try {
          this.$api('uploadUserFile', { file }, response => {
            event.onSuccess(response);
            this.loadUserFiles();
          });
        } catch (err) {
          event.onError();
          console.log(err);
        }
      },
      loadUserFiles() {
        this.$api('getUserFiles', {
          type: 0,
        }).then(data => {
          this.resumeFiles = data.map(e => {
            return {
              id: e.id,
              name: e.fileName,
              url: e.fileUrl,
            };
          });
        });
      },
    },
    mounted() {
      this.loadUserFiles();
    },
  };
</script>
<style lang="scss" scoped>
  .flex {
    display: flex;
    > * {
      flex: 40%;
    }
  }
</style>