<template>
  <div class="infoList">
    <div v-if="dataList.length < 1" class="noData">尚無資料</div>
    <div v-else v-for="(item, index) in dataList" :key="`infoList${index}`" class="infoListItem">
      <div v-if="item.title" class="infoListTitle">{{item.title}}</div>
      <div v-if="item.notes" class="infoListNotes">
        <span v-for="(notesItem, notesIndex) in item.notes" :key="`notesItem${notesIndex}`">{{notesItem}}</span>
      </div>
      <div v-if="item.list" class="infoListContent">
        <div v-for="(listItem, listIndex) in item.list" :key="`itemList${listIndex}`" :class="{contentItem: true, inline: inline}">
          <div v-if="listItem.label" class="label">{{listItem.label}}</div>
          <div v-if="listItem.contents" class="listItemContents">
            <span v-for="(listContentsItem, listContentsIndex) in listItem.contents" :key="`itemListContents${listContentsIndex}`">{{listContentsItem}}</span>
          </div>
        </div>
      </div>
      <div v-if="!hideDelete & isEdit" class="infoListDeleteArea">
        <el-button @click="onEdit(index)" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button @click="onDelete(index)" type="danger" icon="el-icon-delete" circle></el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InfoList',
    props: {
      dataList: { type: Array, default: () => [] },
      inline: { type: Boolean, default: false },
      hideDelete: { type: Boolean, default: false },
      onDelete: { type: Function, default: () => {} },
      onEdit: { type: Function, default: () => {} },
      isEdit: { type: Boolean, default: false },
    },
  };
</script>

<style lang="scss" scoped>
  $infoListItemSpace: 20px;

  .infoList {
    padding-top: $infoListItemSpace;

    .noData {
      padding: 1rem;
      background-color: $grey1;
      color: $grey3;
      text-align-last: center;
    }

    .infoListItem {
      position: relative;
      margin-bottom: $infoListItemSpace;
      padding: $infoListItemSpace;
      background-color: $bgGrey1;
      font-size: 16px;
      overflow: hidden;

      .infoListTitle {
        font-size: 18px;
      }

      .infoListNotes {
        position: absolute;
        top: $infoListItemSpace;
        right: $infoListItemSpace;
        text-align: right;

        span {
          display: block;
        }

        @include rwd($xl) {
          position: relative;
          top: 0;
          right: 0;
          text-align: left;

          span {
            display: inline-block;
            margin-right: 1em;
          }
        }
      }

      .infoListDeleteArea {
        position: absolute;
        width: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(to left, transparent, transparent);
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: 10;
        overflow: hidden;
        transform: translateX(100%);
        transition: transform 0.2s;
      }

      &:hover {
        background-color: darken($bgGrey1, 1%);
        .el-button {
          min-width: none;
        }
        .infoListDeleteArea {
          background-image: linear-gradient(to left, white, transparent);
          width: 160px;
          right: 0;
          bottom: 0;
          opacity: 1;
          transform: translateX(0%);
        }
      }
    }

    .infoListContent {
      padding-top: 16px;

      .contentItem {
        .label {
          display: inline-block;
        }
        .listItemContents {
          display: inline-block;
        }
        span {
          word-break: break-all;
          display: inline-block;
          padding: 0 10px;
          border-right: 1px solid $grey2;

          &:first-child {
            padding-left: 0;
          }

          &:last-child {
            padding-right: 0;
            border-right: 0;
          }
        }

        &.inline {
          display: inline-block;
          padding: 0 10px;
          border-right: 1px solid $grey2;

          &:first-child {
            padding-left: 0;
          }

          &:last-child {
            border-right: 0;
          }
        }
      }
    }
  }
</style>