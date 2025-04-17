<template>
  <b-card no-body>
    <b-card-header header-bg-variant="light">
      <b-card-title>Formulir Pendaftaran Santri Baru</b-card-title>
    </b-card-header>
    <b-card-body>
      <div v-if="isBusy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
      <div v-else>
        <b-overlay :show="loading" rounded opacity="0.6" size="lg" spinner-variant="danger">
          <b-form @submit.prevent="handleSubmit">
            <b-row>
              <b-col cols="12">
                <b-form-group label="Keterangan" label-for="keterangan" label-cols-md="3">
                  <b-form-input id="no_kk" value="Tanda * wajib di isi" plaintext></b-form-input>
                </b-form-group>
                <b-form-group label-for="no_kk" label-cols-md="3" :invalid-feedback="feedback.no_kk" :state="state.no_kk">
                  <template #label>
                    Nomor KK<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="no_kk" v-model="form.no_kk" placeholder="Nomor KK" :state="state.no_kk"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.jalur" :state="state.jalur">
                  <template #label>
                    Jalur Pendaftaran<span class="text-danger">*</span>
                  </template>
                  <template #description v-if="form.jalur == 1" class="text-danger">
                    Untuk jalur Prestasi, Mohon disiapkan berkas-berkas sebagai berikut:
                    <ol class="pl-1">
                      <li>Akademik
                        <ul class="pl-1">
                          <li>Juara lomba tingkat kecamatan/kabupaten/provinsi/nasional/internasional (1,2,3)</li>
                        </ul>
                      </li>
                      <li>Non-akademik
                        <ul class="pl-1">
                          <li>Seni dan olahraga (1,2,3)</li>
                          <li>Tahfidz Al Qur'an lulusan SD/MI (min-1 juz)</li>
                          <li>Tahfidz Al Qur'an lulusan MTs/SMP(min-3 juz)</li>
                        </ul>
                      </li>
                    </ol>
                  </template>
                  <b-form-radio-group v-model="form.jalur" :options="[{ text: 'Prestasi', value: 1 }, { text: 'Reguler', value: 0 }]" :state="state.jalur" name="jalur">
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.nik" :state="state.nik">
                  <template #label>
                    NIK<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="nik" v-model="form.nik" placeholder="NIK" :state="state.nik"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="NISN" label-cols-md="3">
                  <b-form-input id="nisn" v-model="form.nisn" placeholder="NISN" :state="state.nisn"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.nama" :state="state.nama">
                  <template #label>
                    Nama Lengkap<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="nama" v-model="form.nama" placeholder="Nama Lengkap" :state="state.nama"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.jenis_kelamin" :state="state.jenis_kelamin">
                  <template #label>
                    Jenis Kelamin<span class="text-danger">*</span>
                  </template>
                  <b-form-radio-group v-model="form.jenis_kelamin" :options="[{ text: 'Laki-laki', value: 'L' }, { text: 'Perempuan', value: 'P' }]" :state="state.jenis_kelamin" name="jenis_kelamin">
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.tempat_lahir" :state="state.tempat_lahir">
                  <template #label>
                    Tempat Lahir<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="tempat_lahir" v-model="form.tempat_lahir" placeholder="Tempat Lahir" :state="state.tempat_lahir"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.tanggal_lahir" :state="state.tanggal_lahir">
                  <template #label>
                    Tanggal Lahir<span class="text-danger">*</span>
                  </template>
                  <b-input-group>
                    <b-form-select v-model="form.tahun" :options="data_tahun" :state="state.tanggal_lahir"></b-form-select>
                    <b-form-select v-model="form.bulan" :options="data_bulan" :state="state.tanggal_lahir"></b-form-select>
                    <b-form-select v-model="form.tanggal" :options="data_tanggal" :state="state.tanggal_lahir"></b-form-select>
                  </b-input-group>
                  <b-form-invalid-feedback>{{ feedback.tanggal_lahir }}aa</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.alamat" :state="state.alamat">
                  <template #label>
                    Alamat<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="alamat" v-model="form.alamat" placeholder="Alamat" :state="state.alamat"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-for="provinsi_id" label-cols-md="3" :invalid-feedback="feedback.provinsi_id" :state="state.provinsi_id">
                  <template #label>
                    Provinsi<span class="text-danger">*</span>
                  </template>
                  <v-select id="provinsi_id" v-model="form.provinsi_id" :reduce="nama => nama.kode_wilayah" label="nama"
                    :options="data_provinsi" placeholder="== Pilih Provinsi ==" :searchable="true" :clearable="true"
                    :state="state.provinsi_id" @input="changeProvinsi">
                    <template #no-options="{ search, searching, loading }">
                      Tidak ada data untuk ditampilkan
                    </template>
                  </v-select>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-for="kabupaten_id" label-cols-md="3" :invalid-feedback="feedback.kabupaten_id" :state="state.kabupaten_id">
                  <template #label>
                    Kabupaten/Kota<span class="text-danger">*</span>
                  </template>
                  <b-overlay :show="loading_kabupaten" opacity="0.6" size="md" spinner-variant="secondary">
                    <v-select id="kabupaten_id" v-model="form.kabupaten_id" :reduce="nama => nama.kode_wilayah"
                      label="nama" :options="data_kabupaten" placeholder="== Pilih Kabupaten/Kota ==" :searchable="true"
                      :clearable="true" :state="state.kabupaten_id" @input="changeKabupaten">
                      <template #no-options="{ search, searching, loading }">
                        Tidak ada data untuk ditampilkan
                      </template>
                    </v-select>
                  </b-overlay>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-for="kecamatan_id" label-cols-md="3" :invalid-feedback="feedback.kecamatan_id" :state="state.kecamatan_id">
                  <template #label>
                    Kecamatan<span class="text-danger">*</span>
                  </template>
                  <b-overlay :show="loading_kecamatan" opacity="0.6" size="md" spinner-variant="secondary">
                    <v-select id="kecamatan_id" v-model="form.kecamatan_id" :reduce="nama => nama.kode_wilayah"
                      label="nama" :options="data_kecamatan" placeholder="== Pilih Kecamatan ==" :searchable="true"
                      :clearable="true" :state="state.kecamatan_id" @input="changeKecamatan">
                      <template #no-options="{ search, searching, loading }">
                        Tidak ada data untuk ditampilkan
                      </template>
                    </v-select>
                  </b-overlay>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-for="desa_id" label-cols-md="3" :invalid-feedback="feedback.kode_wilayah" :state="state.kode_wilayah">
                  <template #label>
                    Desa/Kelurahan<span class="text-danger">*</span>
                  </template>
                  <b-overlay :show="loading_desa" opacity="0.6" size="md" spinner-variant="secondary">
                    <v-select id="kode_wilayah" v-model="form.kode_wilayah" :reduce="nama => nama.kode_wilayah" label="nama"
                      :options="data_desa" placeholder="== Pilih Desa/Kelurahan ==" :searchable="true" :clearable="true"
                      :state="state.kode_wilayah">
                      <template #no-options="{ search, searching, loading }">
                        Tidak ada data untuk ditampilkan
                      </template>
                    </v-select>
                  </b-overlay>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.nama_ayah" :state="state.nama_ayah">
                  <template #label>
                    Nama Ayah<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="nama_ayah" v-model="form.nama_ayah" placeholder="Nama Ayah" :state="state.nama_ayah"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.nik_ayah" :state="state.nik_ayah">
                  <template #label>
                    NIK Ayah<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="nik_ayah" v-model="form.nik_ayah" placeholder="NIK Ayah" :state="state.nik_ayah"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.nama_ibu" :state="state.nama_ibu">
                  <template #label>
                    Nama Ibu<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="nama_ibu" v-model="form.nama_ibu" placeholder="Nama Ibu" :state="state.nama_ibu"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.nik_ibu" :state="state.nik_ibu">
                  <template #label>
                    NIK Ibu<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="nik_ibu" v-model="form.nik_ibu" placeholder="NIK Ibu" :state="state.nik_ibu"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.anak_ke" :state="state.anak_ke">
                  <template #label>
                    Anak Ke<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="anak_ke" v-model="form.anak_ke" placeholder="Anak Ke" :state="state.anak_ke"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.jml_sdr" :state="state.jml_sdr">
                  <template #label>
                    Jumlah Saudara Kandung<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="jml_sdr" v-model="form.jml_sdr" placeholder="Jumlah Saudara Kandung" :state="state.jml_sdr"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.whatsapp" :state="state.whatsapp">
                  <template #label>
                    Nomor Whatsapp<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="whatsapp" v-model="form.whatsapp" placeholder="Nomor Whatsapp" :state="state.whatsapp"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.jenis_tinggal" :state="state.jenis_tinggal">
                  <template #label>
                    Jenis Tinggal<span class="text-danger">*</span>
                  </template>
                  <template #description>
                    Santri Non Mukim khusus pendaftar RA atau MI yang tidak bermukim di Pesantren (berangkat dari rumah)
                  </template>
                  <b-form-radio-group v-model="form.jenis_tinggal" :options="[{ text: 'Santri Mukim', value: 1 }, { text: 'Non Mukim', value: 0 }]" :state="state.jenis_tinggal" name="jenis_tinggal">
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.lembaga_pilihan" :state="state.lembaga_pilihan">
                  <template #label>
                    Lembaga Pilihan<span class="text-danger">*</span>
                  </template>
                  <b-form-select v-model="form.lembaga_pilihan" :options="data_lembaga" :state="state.lembaga_pilihan"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.sekolah_asal" :state="state.sekolah_asal">
                  <template #label>
                    Asal Sekolah<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="sekolah_asal" v-model="form.sekolah_asal" placeholder="Asal Sekolah" :state="state.sekolah_asal"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3" :invalid-feedback="feedback.alamat_sekolah_asal" :state="state.alamat_sekolah_asal">
                  <template #label>
                    Alamat Sekolah<span class="text-danger">*</span>
                  </template>
                  <b-form-input id="alamat_sekolah_asal" v-model="form.alamat_sekolah_asal" placeholder="Alamat Sekolah" :state="state.alamat_sekolah_asal"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label-cols-md="3">
                  <b-button type="submit" variant="primary">Simpan</b-button>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
        </b-overlay>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardBody, BCardTitle, BSpinner, BOverlay, BForm, BRow, BCol, BFormGroup, BFormInput, BButton, BFormCheckbox, BFormRadioGroup, BFormInvalidFeedback, BFormSelect, BInputGroup, BCardHeader } from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
export default {
  components: {
    flatPickr,
    vSelect,
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BSpinner,
    BOverlay,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    BFormCheckbox,
    BFormRadioGroup,
    BFormInvalidFeedback,
    BFormSelect,
    BInputGroup,
  },
  data() {
    return {
      config: {
        mode: 'range', 
        locale : {
          weekdays: {
            shorthand: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
            longhand: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
          },
          months: {
            shorthand: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Mei",
              "Jun",
              "Jul",
              "Agu",
              "Sep",
              "Okt",
              "Nov",
              "Des",
            ],
            longhand: [
              "Januari",
              "Februari",
              "Maret",
              "April",
              "Mei",
              "Juni",
              "Juli",
              "Agustus",
              "September",
              "Oktober",
              "November",
              "Desember",
            ],
          },
          rangeSeparator: ' s/d ',
        }, 
        altInput: true,
        altFormat: 'j F Y', 
        dateFormat: 'Y-m-d',
      },
      loading: false,
      isBusy: true,
      loading_kabupaten: false,
      loading_kecamatan: false,
      loading_desa: false,
      form: {
        peserta_didik_id: null,
        no_kk: null,
        nik: null,
        nama: null,
        jenis_kelamin: null,
        tempat_lahir: null,
        tahun: null,
        bulan: null,
        tanggal: null,
        tanggal_lahir: null,
        alamat: null,
        provinsi_id: null,
        kabupaten_id: null,
        kecamatan_id: null,
        kode_wilayah: null,
        nama_ayah: null,
        nik_ayah: null,
        nama_ibu: null,
        nik_ibu: null,
        anak_ke: null,
        jml_sdr: null,
        jalur: null,
        whatsapp: null,
        jenis_tinggal: 1,
        lembaga_pilihan: null,
        sekolah_asal: null,
        alamat_sekolah_asal: null,
      },
      feedback: {
        no_kk: null,
        nik: null,
        nama: null,
        jenis_kelamin: null,
        tempat_lahir: null,
        tahun: null,
        bulan: null,
        tanggal: null,
        tanggal_lahir: null,
        alamat: null,
        provinsi_id: null,
        kabupaten_id: null,
        kecamatan_id: null,
        kode_wilayah: null,
        nama_ayah: null,
        nik_ayah: null,
        nama_ibu: null,
        nik_ibu: null,
        anak_ke: null,
        jml_sdr: null,
        jalur: null,
        whatsapp: null,
        jenis_tinggal: null,
        lembaga_pilihan: null,
        sekolah_asal: null,
        alamat_sekolah_asal: null,
      },
      state: {
        no_kk: null,
        nik: null,
        nama: null,
        jenis_kelamin: null,
        tempat_lahir: null,
        tahun: null,
        bulan: null,
        tanggal: null,
        tanggal_lahir: null,
        alamat: null,
        provinsi_id: null,
        kabupaten_id: null,
        kecamatan_id: null,
        kode_wilayah: null,
        nama_ayah: null,
        nik_ayah: null,
        nama_ibu: null,
        nik_ibu: null,
        anak_ke: null,
        jml_sdr: null,
        jalur: null,
        whatsapp: null,
        jenis_tinggal: null,
        lembaga_pilihan: null,
        sekolah_asal: null,
        alamat_sekolah_asal: null,
      },
      data_tahun: [
        { value: null, text: 'Tahun' }
      ],
      data_bulan: [
        { value: null, text: 'Bulan' }
      ],
      data_tanggal: [
        { value: null, text: 'Tanggal' }
      ],
      data_lembaga: [
        { value: null, text: 'Lembaga Pilihan' }
      ],
      data_provinsi: [],
      data_kabupaten: [],
      data_kecamatan: [],
      data_desa: [],
    }
  },
  created() {
    this.loadPostData()
    let start_year = new Date().getFullYear() - 1;
    for (var i = start_year; i > start_year - 100; i--) {
      this.data_tahun.push({
        value: i, text: i
      })
    }
    this.config.locale.months.longhand.forEach((el, index) => {
      let angka = index + 1
      let text = angka.toString().padStart(2, '0')
      this.data_bulan.push({
        value: text, text: el
      })
    });
    for (let i = 1; i < 32; i++) {
      let text = i.toString().padStart(2, '0')
      this.data_tanggal.push({
        value: text, text: text
      })
    }
  },
  methods: {
    loadPostData(){
      this.$http.post('/psb/wilayah').then(res => {
        this.data_provinsi = res.data
      })
      this.$http.get('/psb/get-lembaga').then(res => {
        this.isBusy = false
        let getData = res.data
        getData.lembaga.forEach(s => {
          this.data_lembaga.push({
            value: s.lembaga_id, text: s.nama
          })
        });
      })
      if(this.user){
        this.$http.post('/psb/get-pendaftaran', {
          nik: this.user.nik,
        }).then(res => {
          this.isBusy = false
          let getData = res.data
          this.form = {
            peserta_didik_id: getData.peserta_didik_id,
            no_kk: getData.no_kk,
            nik: getData.nik,
            nisn: getData.nisn,
            nama: getData.nama,
            jenis_kelamin: getData.jenis_kelamin,
            tempat_lahir: getData.tempat_lahir,
            tahun: getData.tahun,
            bulan: getData.bulan,
            tanggal: getData.tanggal,
            tanggal_lahir: getData.tanggal_lahir,
            alamat: getData.alamat,
            provinsi_id: (getData.wilayah) ? getData.wilayah.parrent_recursive.parrent_recursive.parrent_recursive.kode_wilayah : null,
            kabupaten_id: (getData.wilayah) ? getData.wilayah.parrent_recursive.parrent_recursive.kode_wilayah : null,
            kecamatan_id: (getData.wilayah) ? getData.wilayah.parrent_recursive.kode_wilayah : null,
            kode_wilayah: (getData.wilayah) ? getData.kode_wilayah : null,
            nama_ayah: getData.nama_ayah,
            nik_ayah: getData.nik_ayah,
            nama_ibu: getData.nama_ibu,
            nik_ibu: getData.nik_ibu,
            anak_ke: getData.anak_ke,
            jml_sdr: getData.jml_sdr,
            jalur: getData.jalur,
            whatsapp: getData.whatsapp,
            jenis_tinggal: getData.jenis_tinggal,
            lembaga_pilihan: getData.lembaga_pilihan,
            sekolah_asal: getData.sekolah_asal,
            alamat_sekolah_asal: getData.alamat_sekolah_asal,
          }
          this.changeProvinsi(this.form.provinsi_id, true)
          this.changeKabupaten(this.form.kabupaten_id, true)
          this.changeKecamatan(this.form.kecamatan_id, true)
        })
      }
    },
    resetForm(){
      this.form = {
        peserta_didik_id: null,
        no_kk: null,
        nik: null,
        nama: null,
        jenis_kelamin: null,
        tempat_lahir: null,
        tahun: null,
        bulan: null,
        tanggal: null,
        tanggal_lahir: null,
        alamat: null,
        provinsi_id: null,
        kabupaten_id: null,
        kecamatan_id: null,
        kode_wilayah: null,
        nama_ayah: null,
        nik_ayah: null,
        nama_ibu: null,
        nik_ibu: null,
        anak_ke: null,
        jml_sdr: null,
        jalur: null,
        whatsapp: null,
        jenis_tinggal: null,
        lembaga_pilihan: null,
        sekolah_asal: null,
        alamat_sekolah_asal: null,
      }
      this.feedback = {
        no_kk: null,
        nik: null,
        nama: null,
        jenis_kelamin: null,
        tempat_lahir: null,
        tahun: null,
        bulan: null,
        tanggal: null,
        tanggal_lahir: null,
        alamat: null,
        provinsi_id: null,
        kabupaten_id: null,
        kecamatan_id: null,
        kode_wilayah: null,
        nama_ayah: null,
        nik_ayah: null,
        nama_ibu: null,
        nik_ibu: null,
        anak_ke: null,
        jml_sdr: null,
        jalur: null,
        whatsapp: null,
        jenis_tinggal: null,
        lembaga_pilihan: null,
        sekolah_asal: null,
        alamat_sekolah_asal: null,
      }
      this.state = {
        no_kk: null,
        nik: null,
        nama: null,
        jenis_kelamin: null,
        tempat_lahir: null,
        tahun: null,
        bulan: null,
        tanggal: null,
        tanggal_lahir: null,
        alamat: null,
        provinsi_id: null,
        kabupaten_id: null,
        kecamatan_id: null,
        kode_wilayah: null,
        nama_ayah: null,
        nik_ayah: null,
        nama_ibu: null,
        nik_ibu: null,
        anak_ke: null,
        jml_sdr: null,
        jalur: null,
        whatsapp: null,
        jenis_tinggal: null,
        lembaga_pilihan: null,
        sekolah_asal: null,
        alamat_sekolah_asal: null,
      }
      this.data_lembaga = [
        { value: null, text: 'Lembaga Pilihan' }
      ]
      this.data_provinsi = []
      this.data_kabupaten = []
      this.data_kecamatan = []
      this.data_desa = []
    },
    handleSubmit(){
      this.loading = true
      if(this.form.tahun && this.form.bulan && this.form.tanggal){
        this.form.tanggal_lahir = `${this.form.tahun}-${this.form.bulan}-${this.form.tanggal}`
      }
      this.$http.post('/psb/daftar', this.form).then(res => {
        this.loading = false
        let getData = res.data
        if(getData.errors){
          this.state.no_kk = (getData.errors.no_kk) ? false : null
          this.state.nik = (getData.errors.nik) ? false : null
          this.state.nama = (getData.errors.nama) ? false : null
          this.state.jenis_kelamin = (getData.errors.jenis_kelamin) ? false : null
          this.state.tempat_lahir = (getData.errors.tempat_lahir) ? false : null
          this.state.tahun = (getData.errors.tahun) ? false : null
          this.state.bulan = (getData.errors.bulan) ? false : null
          this.state.tanggal = (getData.errors.tanggal) ? false : null
          this.state.tanggal_lahir = (getData.errors.tanggal_lahir) ? false : null
          this.state.alamat = (getData.errors.alamat) ? false : null
          this.state.provinsi_id = (getData.errors.provinsi_id) ? false : null
          this.state.kabupaten_id = (getData.errors.kabupaten_id) ? false : null
          this.state.kecamatan_id = (getData.errors.kecamatan_id) ? false : null
          this.state.kode_wilayah = (getData.errors.kode_wilayah) ? false : null
          this.state.nama_ayah = (getData.errors.nama_ayah) ? false : null
          this.state.nik_ayah = (getData.errors.nik_ayah) ? false : null
          this.state.nama_ibu = (getData.errors.nama_ibu) ? false : null
          this.state.nik_ibu = (getData.errors.nik_ibu) ? false : null
          this.state.anak_ke = (getData.errors.anak_ke) ? false : null
          this.state.jml_sdr = (getData.errors.jml_sdr) ? false : null
          this.state.jalur = (getData.errors.jalur) ? false : null
          this.state.whatsapp = (getData.errors.whatsapp) ? false : null
          this.state.jenis_tinggal = (getData.errors.jenis_tinggal) ? false : null
          this.state.lembaga_pilihan = (getData.errors.lembaga_pilihan) ? false : null
          this.state.sekolah_asal = (getData.errors.sekolah_asal) ? false : null
          this.state.alamat_sekolah_asal = (getData.errors.alamat_sekolah_asal) ? false : null
          this.feedback.no_kk = (getData.errors.no_kk) ? getData.errors.no_kk.join(', ') : null
          this.feedback.nik = (getData.errors.nik) ? getData.errors.nik.join(', ') : null
          this.feedback.nama = (getData.errors.nama) ? getData.errors.nama.join(', ') : null
          this.feedback.jenis_kelamin = (getData.errors.jenis_kelamin) ? getData.errors.jenis_kelamin.join(', ') : null
          this.feedback.tempat_lahir = (getData.errors.tempat_lahir) ? getData.errors.tempat_lahir.join(', ') : null
          this.feedback.tahun = (getData.errors.tahun) ? getData.errors.tahun.join(', ') : null
          this.feedback.bulan = (getData.errors.bulan) ? getData.errors.bulan.join(', ') : null
          this.feedback.tanggal = (getData.errors.tanggal) ? getData.errors.tanggal.join(', ') : null
          this.feedback.tanggal_lahir = (getData.errors.tanggal_lahir) ? getData.errors.tanggal_lahir.join(', ') : null
          this.feedback.alamat = (getData.errors.alamat) ? getData.errors.alamat.join(', ') : null
          this.feedback.provinsi_id = (getData.errors.provinsi_id) ? getData.errors.provinsi_id.join(', ') : null
          this.feedback.kabupaten_id = (getData.errors.kabupaten_id) ? getData.errors.kabupaten_id.join(', ') : null
          this.feedback.kecamatan_id = (getData.errors.kecamatan_id) ? getData.errors.kecamatan_id.join(', ') : null
          this.feedback.kode_wilayah = (getData.errors.kode_wilayah) ? getData.errors.kode_wilayah.join(', ') : null
          this.feedback.nama_ayah = (getData.errors.nama_ayah) ? getData.errors.nama_ayah.join(', ') : null
          this.feedback.nik_ayah = (getData.errors.nik_ayah) ? getData.errors.nik_ayah.join(', ') : null
          this.feedback.nama_ibu = (getData.errors.nama_ibu) ? getData.errors.nama_ibu.join(', ') : null
          this.feedback.nik_ibu = (getData.errors.nik_ibu) ? getData.errors.nik_ibu.join(', ') : null
          this.feedback.anak_ke = (getData.errors.anak_ke) ? getData.errors.anak_ke.join(', ') : null
          this.feedback.jml_sdr = (getData.errors.jml_sdr) ? getData.errors.jml_sdr.join(', ') : null
          this.feedback.jalur = (getData.errors.jalur) ? getData.errors.jalur.join(', ') : null
          this.feedback.whatsapp = (getData.errors.whatsapp) ? getData.errors.whatsapp.join(', ') : null
          this.feedback.jenis_tinggal = (getData.errors.jenis_tinggal) ? getData.errors.jenis_tinggal.join(', ') : null
          this.feedback.lembaga_pilihan = (getData.errors.lembaga_pilihan) ? getData.errors.lembaga_pilihan.join(', ') : null
          this.feedback.sekolah_asal = (getData.errors.sekolah_asal) ? getData.errors.sekolah_asal.join(', ') :  null
          this.feedback.alamat_sekolah_asal = (getData.errors.alamat_sekolah_asal) ? getData.errors.alamat_sekolah_asal.join(', ') :  null
        } else {
          this.$swal({
            icon: getData.icon,
            title: getData.title,
            text: getData.text,
            customClass: {
              confirmButton: 'btn btn-success',
            },
            allowOutsideClick: false,
          }).then(result => {
            this.loadPostData()
            this.resetForm()
          })
        }
      })
    },
    changeProvinsi(val, edit) {
      if(!edit){
        this.form.kabupaten_id = null
        this.form.kecamatan_id = null
        this.form.desa_id = null
      }
      if (val) {
        this.loading_kabupaten = true
        this.$http.post('/psb/wilayah', {
          provinsi_id: val,
        }).then(res => {
          this.loading_kabupaten = false
          this.data_kabupaten = res.data
        });
      }
    },
    changeKabupaten(val, edit) {
      if(!edit){
        this.form.kecamatan_id = null
        this.form.desa_id = null
      }
      if (val) {
        this.loading_kecamatan = true
        this.$http.post('/psb/wilayah', {
          kabupaten_id: val,
        }).then(res => {
          this.loading_kecamatan = false
          this.data_kecamatan = res.data
        });
      }
    },
    changeKecamatan(val, edit) {
      if(!edit){
        this.form.kode_wilayah = null
      }
      if (val) {
        this.loading_kelurahan = true
        this.$http.post('/psb/wilayah', {
          kecamatan_id: val,
        }).then(res => {
          this.loading_kelurahan = false
          this.data_desa = res.data
        });
      }
    },
  },
}
</script>
<style lang="scss">
@import '~@resources/scss/vue/libs/vue-sweetalert.scss';
@import '~@resources/scss/vue/libs/vue-flatpicker.scss';
</style>