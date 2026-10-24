import type { Locale } from '@/i18n/config'
export const editorial: Record<
  Locale,
  {
    title: string
    description: string
    sections: { title: string; text: string }[]
  }
> = {
  en: {
    title: 'About this independent guide',
    description: 'How we choose places, check sources and handle your data.',
    sections: [
      {
        title: 'Who maintains the guide',
        text: 'This independent project is maintained through the Website-Japan repository. It is not an official tourism authority or booking agency. Project history and corrections are public on GitHub.',
      },
      {
        title: 'Sources and corrections',
        text: 'Prefecture introductions refer to JNTO; venue access and admission refer to operators where checked. Map coordinates and location labels are credited to OpenStreetMap. A review date applies to the information named beside it, not a guarantee that every detail is current. Unknown details are marked explicitly. Please report a page URL and the correction with an official source.',
      },
      {
        title: 'Your trip and privacy',
        text: 'Trips and appearance settings are stored in this browser. There is no account or cross-device cloud sync. Clearing browser data removes the saved trip. Backups and offline files can contain accommodation, dates and personal notes; review them before sharing. This site does not operate booking or payment forms and does not include visitor analytics or advertising trackers.',
      },
      {
        title: 'External services',
        text: 'Viewing an interactive map makes requests to OpenStreetMap tile servers, which receive normal connection information such as your IP address and referring website. Google Maps, official visitor sites and GitHub open only when you follow their links and apply their own policies. Hosting infrastructure may keep access logs; deployment-specific retention details must be published by the site operator.',
      },
      {
        title: 'Accessibility and illustrated scenery',
        text: 'Use the list instead of the map, keyboard controls, day/night themes and the shared animation pause. System reduced-motion settings take precedence. The 3D miniature is an illustration, not a geographic model. Report accessibility barriers through the project issue link without including personal trip data.',
      },
    ],
  },
  ja: {
    title: 'この独立した旅行ガイドについて',
    description: '場所の選び方、出典の確認、データの取り扱い。',
    sections: [
      {
        title: '運営について',
        text: 'Website-Japanリポジトリで管理する独立したプロジェクトです。公的な観光機関や予約代理店ではありません。変更履歴や修正はGitHubで公開しています。',
      },
      {
        title: '出典と訂正',
        text: '都道府県の紹介はJNTO、確認済みのアクセス・料金は運営者の案内を参照しています。地図の座標と地名はOpenStreetMapに基づきます。確認日は併記された情報に対するもので、すべての情報の最新性を保証するものではありません。未確認の項目は明示しています。訂正の際はページURLと公式の出典をお知らせください。',
      },
      {
        title: '旅程とプライバシー',
        text: '旅程と表示設定はこのブラウザに保存します。アカウントや端末間のクラウド同期はありません。ブラウザデータを削除すると旅程も消えます。バックアップとオフラインファイルには宿泊先・日付・メモが含まれる場合があります。共有前に確認してください。予約・決済フォーム、アクセス解析、広告トラッカーは設置していません。',
      },
      {
        title: '外部サービス',
        text: '地図の表示時はOpenStreetMapのタイルサーバーに接続し、IPアドレスや参照元など通常の通信情報を送信します。Google Maps、公式観光サイト、GitHubはリンクを開いた場合に各サービスの方針が適用されます。ホスティング側でアクセスログを保存する場合があり、公開環境の保持期間は運営者が別途案内する必要があります。',
      },
      {
        title: 'アクセシビリティと模型',
        text: '地図の代わりに一覧を使えます。キーボード操作、昼夜テーマ、共通のアニメーション停止に対応し、OSの動きを減らす設定を優先します。3D模型はイメージであり地理的な地図ではありません。利用上の問題は個人的な旅程を含めず、プロジェクトの報告リンクからお知らせください。',
      },
    ],
  },
  th: {
    title: 'เกี่ยวกับคู่มือท่องเที่ยวอิสระนี้',
    description: 'แนวทางคัดเลือกสถานที่ ตรวจแหล่งข้อมูล และดูแลข้อมูลของคุณ',
    sections: [
      {
        title: 'ผู้ดูแลคู่มือ',
        text: 'โครงการอิสระนี้ดูแลผ่าน repository Website-Japan ไม่ใช่องค์การท่องเที่ยวทางการหรือตัวแทนรับจอง สามารถดูประวัติการปรับปรุงและแจ้งข้อผิดพลาดผ่าน GitHub ได้',
      },
      {
        title: 'แหล่งข้อมูลและการแก้ไข',
        text: 'ข้อมูลจังหวัดอ้างอิง JNTO ส่วนการเดินทางและค่าเข้าที่ตรวจแล้วอ้างอิงผู้ให้บริการ พิกัดและชื่อบนแผนที่อ้างอิง OpenStreetMap วันที่ตรวจหมายถึงข้อมูลที่ระบุข้างกัน ไม่ได้รับรองว่าทุกรายละเอียดเป็นปัจจุบัน ข้อมูลที่ยังไม่ได้ตรวจจะแสดงไว้ชัดเจน หากพบข้อผิดพลาด โปรดระบุ URL ของหน้าและแหล่งทางการที่ใช้อ้างอิง',
      },
      {
        title: 'ทริปและความเป็นส่วนตัว',
        text: 'ทริปและการตั้งค่าการแสดงผลเก็บในเบราว์เซอร์นี้ ไม่มีบัญชีหรือการซิงก์บนคลาวด์ข้ามอุปกรณ์ การล้างข้อมูลเบราว์เซอร์ทำให้ทริปหาย ไฟล์สำรองและไฟล์ออฟไลน์อาจมีที่พัก วันที่ และหมายเหตุส่วนตัว โปรดตรวจสอบก่อนแชร์ เว็บไม่มีแบบฟอร์มจองหรือชำระเงิน และไม่ได้ติดตั้งระบบวิเคราะห์ผู้เข้าชมหรือตัวติดตามโฆษณา',
      },
      {
        title: 'บริการภายนอก',
        text: 'เมื่อแสดงแผนที่จะมีการเชื่อมต่อเซิร์ฟเวอร์แผนที่ OpenStreetMap ซึ่งได้รับข้อมูลการเชื่อมต่อทั่วไป เช่น IP และเว็บไซต์ต้นทาง เมื่อกดลิงก์ Google Maps เว็บไซต์ผู้ให้บริการ หรือ GitHub จะอยู่ภายใต้นโยบายของบริการนั้น ระบบโฮสติ้งอาจเก็บบันทึกการเข้าถึง ผู้ดูแลต้องระบุระยะเวลาเก็บข้อมูลของระบบที่เผยแพร่จริงเพิ่มเติม',
      },
      {
        title: 'การเข้าถึงและฉากจำลอง',
        text: 'ใช้รายการแทนแผนที่ได้ รองรับคีย์บอร์ด ธีมกลางวันและกลางคืน และการหยุดแอนิเมชันร่วมกัน โดยให้ความสำคัญกับการลดการเคลื่อนไหวที่ตั้งในอุปกรณ์ ฉาก 3D เป็นภาพประกอบ ไม่ใช่แผนที่ภูมิศาสตร์ แจ้งปัญหาการใช้งานผ่านลิงก์โครงการได้โดยไม่ใส่ข้อมูลทริปส่วนตัว',
      },
    ],
  },
}
