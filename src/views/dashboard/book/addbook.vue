<template>
  <v-container id="book-add" fluid tag="section">
    <v-col class="text-left">
      <router-link to="/book/listbook">
        <v-btn id="myButton" color="primary" class="mb-5"
          >CLick to view book list!</v-btn
        >
      </router-link>
    </v-col>
    <v-row>
      <v-col cols="12" md="12">
        <base-material-card
          color="success"
          icon="mdi-book"
          title="BOOK ADD FORM"
          class="px-5 py-3"
        >
          <form ref="bookForm" class="mt-5" id="app" data-vv-scope="form-1">
            <v-text-field
              v-model="title"
              v-validate="'required'"
              color="secondary"
              data-vv-name="required"
              label="Title"
              name="title"
            />
            <v-select
              v-validate="'required'"
              color="secondary"
              data-vv-name="required"
              label="Category"
              name="category"
              :items="itemcate"
              v-model="category"
            />
            <v-text-field
              v-model="author"
              v-validate="'required'"
              color="secondary"
              data-vv-name="required"
              label="Author"
              name="author"
            />
            <v-text-field
              v-model="description"
              v-validate="'required'"
              color="secondary"
              data-vv-name="required"
              label="Description"
              name="description"
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
  name: "DashboardbookAddForms",

  $_veeValidate: {
    validator: "new",
  },

  data: () => ({
    url: [],
    catelist: [],
    itemcate: [],
    files: [],
    title: "",
    description: "",
    cover: "",
    author: "",
  }),
  computed: {
    ...mapGetters(["categoryList"]),
  },
  created() {
    this.catelist = this.categoryList;
    for (let index = 0; index < this.catelist.length; index++) {
      const itemval = this.catelist[index].title;
      this.itemcate[index] = { text: itemval.toUpperCase(), category: itemval };
    }
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
          const result2 = await bookApi.addbook(formData);
          if (result2.data.code === 200) {
            // this.$notificate.showMessage({
            //   content: result2.data.message,
            //   color: "info",
            // });
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
