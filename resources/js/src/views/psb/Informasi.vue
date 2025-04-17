<template>
  <b-row  style="font-size: 120%;">
    <b-col cols="12">
      <b-card title="Syarat Pendaftaran">
        <b-row>
          <b-col>
            <p>Untuk memenuhi persyaratan pendaftaran santri baru, perlu beberapa berkas
              yang harus disiapkan:</p>
              <app-timeline>
                <app-timeline-item subtitle="Foto Copy Kartu Keluarga (3 Lembar)" icon="CheckIcon" variant="success" />
                <app-timeline-item subtitle="Foto Copy Akta Kelahiran (3 Lembar)" icon="CheckIcon" variant="success" />
                <app-timeline-item subtitle="Foto Copy KTP orang tua (3 Lembar)" icon="CheckIcon" variant="success" />
                <app-timeline-item subtitle="Foto Copy Ijasah/SKL (3 Lembar)" icon="CheckIcon" variant="success" />
                <app-timeline-item subtitle="Foto Copy KIP/KPH (Bagi yang memiliki)" icon="CheckIcon" variant="success" />
                <app-timeline-item subtitle="Foto 3x4 (3 Lembar)" icon="CheckIcon" variant="success" />
                <app-timeline-item subtitle="NISN" icon="CheckIcon" variant="success" />
              </app-timeline>
          </b-col>
          <b-col>
            <b-img center fluid src="/images/poster/info.jpeg" width="400" alt="Poster Info" />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-col cols="12">
      <b-card title="Informasi Pelayanan Pendaftaran">
        <b-row>
          <b-col>
            <b-img center fluid src="/images/poster/info.jpeg" alt="Poster Info" />
          </b-col>
          <b-col>
            <app-collapse>
              <app-collapse-item title="Periode Pendaftaran" :isVisible="true">
                <p>Gelombang 1:<br><strong>31 Oktober s/d 14 Desember 2024</strong></p>
                <p>Gelombang 2:<br><strong>18 Desember 2024 s/d 25 April 2025</strong></p>
                <p>Gelombang 3:<br><strong>29 April s/d 12 Juli 2025</strong></p>
              </app-collapse-item>
              <app-collapse-item title="Waktu Pelayanan" :isVisible="true">
                <p>Pagi:</p>
                <p><strong>08.00 ~ 12.00 WIB</strong></p>
                <p>Siang:</p>
                <p><strong>13.00 ~ 16.00 WIB</strong></p>
              </app-collapse-item>
              <app-collapse-item title="Informasi Pelayanan" :isVisible="true">
                <p>Ust. Abdul Kholiq : <a href="https://wa.me/6285234223306" target="_blank"><strong>6285234223306</strong></a></p>
                <p>Usth. Najmi (RA) : <a href="https://wa.me/6285253600654" target="_blank"><strong>6285253600654</strong></a></p>
                <p>Ust. Najib (MI) : <a href="https://wa.me/6282143280252" target="_blank"><strong>6282143280252</strong></a></p>
                <p>Ust. Khofil (MTs) : <a href="https://wa.me/6285388724561" target="_blank"><strong>6285388724561</strong></a></p>
                <p>Ust. Ubed (SMP) :  <a href="https://wa.me/6285320561697" target="_blank"><strong>6285320561697</strong></a></p>
                <p>Ust. Aziz (MA) : <a href="https://wa.me/6282230213310" target="_blank"><strong>6282230213310</strong></a></p>
                <p>Ust. Fauzi (SMK) : <a href="https://wa.me/6285234980128" target="_blank"><strong>6285234980128</strong></a></p>
              </app-collapse-item>
            </app-collapse>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol, BCard, BImg } from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BImg,
    AppTimeline,
    AppTimelineItem,
    AppCollapse,
    AppCollapseItem
  },
}
</script>