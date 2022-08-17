<template>
  <div class="explorer flex flex--column">
    <div class="side-title flex flex--row flex--space-between">
      <div class="flex flex--row" v-if="!showSearch">
        <button class="side-title__button side-title__button--new-file button" @click="newItem()" v-title="'创建文件'">
          <icon-file-plus></icon-file-plus>
        </button>
        <button class="side-title__button side-title__button--new-folder button" @click="newItem(true)" v-title="'创建文件夹'">
          <icon-folder-plus></icon-folder-plus>
        </button>
        <button class="side-title__button side-title__button--delete button" @click="deleteItem()" v-title="'删除'">
          <icon-delete></icon-delete>
        </button>
        <button class="side-title__button side-title__button--rename button" @click="editItem()" v-title="'重命名'">
          <icon-pen></icon-pen>
        </button>
        <button class="side-title__button side-title__button--search button" @click="toSearch()" v-title="'搜索文件'">
          <icon-search></icon-search>
        </button>
      </div>
      <div class="flex flex--row" v-else>
        <button class="side-title__button button" @click="back()" v-title="'返回资源管理器'">
          <icon-dots-horizontal></icon-dots-horizontal>
        </button>
        <div class="side-title__title">
          搜索文件
        </div>
      </div>
      <button class="side-title__button side-title__button--close button" @click="toggleExplorer(false)" v-title="'关闭资源管理器'">
        <icon-close></icon-close>
      </button>
    </div>
    <div class="explorer__tree" :class="{'explorer__tree--new-item': !newChildNode.isNil}" v-if="!light" v-show="!showSearch" tabindex="0" @keydown.delete="deleteItem()">
      <explorer-node :node="rootNode" :depth="0"></explorer-node>
    </div>
    <div class="explorer__search" tabindex="0" v-if="!light && showSearch">
      <input type="text" v-model="searchText" class="text-input" placeholder="请输入关键字回车" @keyup.enter="search"></input>
      <div class="explorer__search-list">
        <div class="search-tips" v-if="searching">正在查询中...</div>
        <a class="menu-entry button flex flex--row flex--align-center" :class="{'search-node--selected': currentFileId === fileItem.id}"
            v-for="fileItem in searchItems" :key="fileItem.id" @click="clickSearch(fileItem)" href="javascript:void(0)">
          {{ fileItem.name }}
        </a>
        <div class="search-tips">最多返回匹配的50个文档</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ExplorerNode from './ExplorerNode';
import explorerSvc from '../services/explorerSvc';
import store from '../store';
import MenuEntry from './menus/common/MenuEntry';
import localDbSvc from '../services/localDbSvc';

export default {
  components: {
    ExplorerNode,
    MenuEntry,
  },
  data: () => ({
    currentFileId: '',
    showSearch: false,
    searching: false,
    searchText: '',
    searchItems: [],
  }),
  computed: {
    ...mapState([
      'light',
    ]),
    ...mapState('explorer', [
      'newChildNode',
    ]),
    ...mapGetters('explorer', [
      'rootNode',
      'selectedNode',
    ]),
    workspaceId: () => store.getters['workspace/currentWorkspace'].id,
  },
  methods: {
    ...mapActions('data', [
      'toggleExplorer',
    ]),
    newItem: isFolder => explorerSvc.newItem(isFolder),
    deleteItem: () => explorerSvc.deleteItem(),
    editItem() {
      const node = this.selectedNode;
      if (!node.isTrash && !node.isTemp) {
        store.commit('explorer/setEditingId', node.item.id);
      }
    },
    back() {
      this.showSearch = false;
    },
    toSearch() {
      this.showSearch = true;
    },
    search() {
      this.searchItems = [];
      if (!this.searchText) {
        return;
      }
      this.searching = true;
      const allFileById = {};
      const filterIds = [];
      localDbSvc.getWorkspaceItems(this.workspaceId, (item) => {
        if (item.type !== 'file' && item.type !== 'content') {
          return;
        }
        if (item.type === 'file') {
          allFileById[item.id] = item;
        }
        if (filterIds.length >= 50) {
          return;
        }
        const fileId = item.id.split('/')[0];
        // 包含了直接跳过
        if (filterIds.indexOf(fileId) > -1) {
          return;
        }
        if (item.name && item.name.indexOf(this.searchText) > -1) {
          filterIds.push(fileId);
        }
        if (item.text && item.text.indexOf(this.searchText) > -1) {
          filterIds.push(fileId);
        }
      }, () => {
        filterIds.forEach((it) => {
          const file = allFileById[it];
          if (file) {
            this.searchItems.push(file);
          }
        });
        this.searching = false;
      });
    },
    clickSearch(item) {
      store.commit('explorer/setSelectedId', item.id);
      store.commit('file/setCurrentId', item.id);
      this.showSearch = false;
    },
  },
  created() {
    this.$watch(
      () => store.getters['file/current'].id,
      (currentFileId) => {
        this.currentFileId = currentFileId;
        store.commit('explorer/setSelectedId', currentFileId);
        store.dispatch('explorer/openNode', currentFileId);
      }, {
        immediate: true,
      },
    );
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.explorer,
.explorer__tree {
  height: 100%;
}

.explorer__tree {
  overflow: auto;

  /* fake element */
  & > .explorer-node > .explorer-node__children > .explorer-node:last-child > .explorer-node__item {
    height: 20px;
    cursor: auto;
  }
}

.explorer__search {
  overflow: auto;

  .explorer__search-list {
    margin-top: 10px;
  }

  .menu-entry {
    font-size: 14px;
    padding: 5px;
  }

  .menu-entry__icon {
    width: 0;
    margin-left: 0;
    border-bottom: 1px solid $hr-color;
  }

  .search-tips {
    font-size: 10px;
    background-color: rgba(255, 173, 51, 0.14902);
    padding: 5px;
    text-align: center;
  }

  .search-node--selected {
    background-color: rgba(0, 0, 0, 0.2);

    .app--dark & {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
