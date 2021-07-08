<template>
  <v-container id="user-update" fluid tag="section">
    <base-v-component heading="Users" link="components/users" />
    <v-col class="text-left">
      <router-link to="/book/listbook">
        <v-btn id="myButton" color="primary" class="mb-5"
          >CLick to view user list!</v-btn
        >
      </router-link>
    </v-col>
    <v-row>
      <v-col cols="12" md="12">
        <base-material-card
          color="success"
          icon="mdi-book"
          title="BOOK UPDATE FORM"
          class="px-5 py-3"
        >
          <form ref="bookForm" class="mt-5" id="app" data-vv-scope="form-1">
            <v-row>
              <v-col cols="4" md="4">
                <v-img :src="coverURL" height="500" width="500"> </v-img>
              </v-col>
              <v-col cols="8" md="8">
                <v-text-field
                  color="secondary"
                  label="Id"
                  name="id"
                  v-model="id"
                  disabled
                />
                <v-text-field
                  color="secondary"
                  data-vv-name="required"
                  label="Title"
                  name="title"
                  v-model="title"
                />
                <v-select
                  color="secondary"
                  data-vv-name="required"
                  label="Category"
                  name="category"
                  :items="itemcate"
                  v-model="category"
                />
                <v-text-field
                  color="secondary"
                  data-vv-name="required"
                  label="Author"
                  name="author"
                  v-model="author"
                />
                <v-text-field
                  color="secondary"
                  data-vv-name="required"
                  label="Owner"
                  name="owner"
                  v-model="owner"
                  disabled
                />
                <v-text-field
                  color="secondary"
                  data-vv-name="required"
                  label="Description"
                  name="description"
                  v-model="description"
                />
                <v-row>
                  <input
                    style="padding-left: 12px; padding-top: 20px"
                    ref="files"
                    type="file"
                    id="cover"
                    @change="onFileChange"
                    name="cover"
                    accept="image/*"
                    multiple
                  />
                </v-row>
                <v-row>
                  <v-col cols="2" v-for="item in url">
                    <img
                      :src="item"
                      width="200px"
                      height="200px"
                      style="padding: 10px"
                    />
                  </v-col>
                </v-row>
                <v-card-actions class="pl-0">
                  <v-btn
                    color="success"
                    min-width="100"
                    @click.prevent="validateForm('form-1')"
                  >
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

const { bookApi } = require("../../../apis");

export default {
  name: "DashboardFormsRegularForms",

  $_veeValidate: {
    validator: "new",
  },
  data() {
    return {
      boo: false,
      bookUpdate: [],
      itemcate: [],
      catelist: [],
      bookList: [],
      coverURL: "",
      url: [],
      title: "",
      description: "",
      cover: "",
      author: "",
      id: "",
      owner: "",
    };
  },
  computed: {
    ...mapGetters(["categoryList"]),
  },
  created: async function () {
    this.catelist = this.categoryList;
    for (let index = 0; index < this.catelist.length; index++) {
      const itemval = this.catelist[index].title;
      this.itemcate[index] = { text: itemval.toUpperCase(), category: itemval };
    }
    const result = await bookApi.getDetail(this.$route.params.bookId);
    if (result.data.code === 200) {
      this.bookUpdate = result.data.book;
    }
    this.coverURL = "https://bookvuejs.herokuapp.com/".concat(this.bookUpdate.cover[0]);
    this.title = this.bookUpdate.title;
    this.description = this.bookUpdate.description;
    this.author = this.bookUpdate.author;
    this.id = this.bookUpdate._id;
    this.owner = this.bookUpdate.owner;
    this.category = this.bookUpdate.category;
  },
  methods: {
    validateForm(scope) {
      this.$validator.validateAll(scope).then(async (result) => {
        if (result) {
          this.files = this.$refs.files.files;
          console.log(this.files);
          const formData = new FormData();
          for (const i of Object.keys(this.files)) {
            formData.append("cover", this.files[i]);
          }
          formData.append("title", this.title);
          formData.append("description", this.description);
          formData.append("author", this.author);
          formData.append("category", this.category);
          const result2 = await bookApi.updatebook(
            this.$route.params.bookId,
            formData
          );
          if (result2.data.code === 200) {
            this.$notificate.showMessage({
              content: result2.data.message,
              color: "success",
            });
            this.$router.push("/book/listbook");
          } else {
            this.$notificate.showMessage({
              content: result2.data.message,
              color: "info",
            });
          }
        }
      });
    },
    onFileChange(e) {
      this.url = [];
      const file = e.target.files;
      for (let i = 0; i < file.length; i++) {
        this.url.push(URL.createObjectURL(file[i]));
      }
    },
  },
};
</script>