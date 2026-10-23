import type { Locale } from '@/i18n/config'

type Step = {
  id: string
  source: string
  copy: Record<Locale, { title: string; items: string[] }>
}
export const firstVisitSteps: Step[] = [
  {
    id: 'documents',
    source: 'https://www.digital.go.jp/en/policies/visit_japan_web',
    copy: {
      en: {
        title: 'Before you fly: documents and your first night',
        items: [
          'Check passport, entry and visa requirements with the Japanese embassy or consulate for your nationality. Do this before booking non-refundable travel.',
          'Use the Digital Agency link for Visit Japan Web arrival procedures. Keep your passport, accommodation address and any required documents accessible; completing the service does not itself grant entry.',
          'Book the first night near a workable transport route. Save the hotel name, Japanese address, check-in deadline and phone number offline.',
        ],
      },
      ja: {
        title: '出発前：書類と最初の宿',
        items: [
          '国籍に合う旅券・入国・ビザの条件を日本大使館や領事館で確認。返金できない予約の前に調べましょう。',
          '入国手続のVisit Japan Webはデジタル庁のリンクから。旅券、宿の住所、必要書類を取り出せる場所に。登録だけで入国が許可されるわけではありません。',
          '初日の宿は移動しやすい場所を選び、日本語の宿名・住所、チェックイン締切、電話番号をオフラインで保存。',
        ],
      },
      th: {
        title: 'ก่อนบิน: เอกสารและที่พักคืนแรก',
        items: [
          'ตรวจหนังสือเดินทาง เงื่อนไขเข้าประเทศ และวีซ่าตามสัญชาติจากสถานทูตหรือสถานกงสุลญี่ปุ่น ก่อนจองบริการที่คืนเงินไม่ได้',
          'เข้า Visit Japan Web ผ่านลิงก์ Digital Agency เพื่อเตรียมขั้นตอนขาเข้า เก็บพาสปอร์ต ที่อยู่ที่พัก และเอกสารที่ต้องใช้ไว้หยิบง่าย การกรอกระบบไม่ได้เป็นการอนุมัติเข้าประเทศ',
          'เลือกที่พักคืนแรกที่เดินทางถึงได้สะดวก บันทึกชื่อและที่อยู่ภาษาญี่ปุ่น เวลารับเช็กอินสุดท้าย และเบอร์โทรไว้แบบออฟไลน์',
        ],
      },
    },
  },
  {
    id: 'airport',
    source: 'https://www.japan.travel/en/plan/airport-access/',
    copy: {
      en: {
        title: 'At the airport: get to your hotel',
        items: [
          'Finish arrival procedures and collect your luggage before committing to a departure time. Confirm the airport and terminal printed on your ticket.',
          'Search the hotel’s actual address in Google Maps. Compare the route, changes and last service with the airport operator’s information. Allow extra time after a long flight.',
          'Check whether the ticket includes a reserved seat or an extra express fare. Keep the ticket or IC card until you leave the station at your destination.',
        ],
      },
      ja: {
        title: '空港から：まず宿へ',
        items: [
          '到着手続と荷物受け取りを済ませてから出発時刻を決めましょう。航空券の空港名とターミナルも確認。',
          'Google Mapsには宿の正確な住所を入力。経路、乗り換え、最終便を空港や交通機関の案内と照合し、長いフライトの後は余裕を。',
          '指定席や特急料金が含まれる切符か確認。目的地の改札を出るまで切符やICカードを保管してください。',
        ],
      },
      th: {
        title: 'ถึงสนามบิน: ไปโรงแรมก่อน',
        items: [
          'ผ่านขั้นตอนขาเข้าและรับกระเป๋าก่อนกำหนดเวลารถต่อ ตรวจชื่อสนามบินและอาคารบนตั๋วให้ตรง',
          'ค้นที่อยู่โรงแรมจริงใน Google Maps แล้วเทียบเส้นทาง จุดเปลี่ยนรถ และเที่ยวสุดท้ายกับข้อมูลสนามบินหรือผู้ให้บริการ เผื่อเวลาหลังเที่ยวบินยาว',
          'ตรวจว่าตั๋วรวมที่นั่งจองหรือค่ารถด่วนพิเศษแล้วหรือยัง เก็บตั๋วหรือบัตร IC จนผ่านประตูออกที่สถานีปลายทาง',
        ],
      },
    },
  },
  {
    id: 'transport',
    source: 'https://www.japan.travel/en/plan/getting-around/',
    copy: {
      en: {
        title: 'Your first train: read the whole route',
        items: [
          'Check the line name, direction, platform and exit—not only the station name. Different operators can have nearby stations with similar names.',
          'An IC card is useful on many local networks, but coverage varies and it is not a universal shinkansen ticket. Compare single tickets and passes for your actual route.',
          'Keep one main area per day. Use a named place’s directions button, select transit or walking, and confirm the entrance before leaving.',
        ],
      },
      ja: {
        title: '最初の電車：経路全体を確認',
        items: [
          '駅名だけでなく路線、行き先、ホーム、出口を確認。同じような名前でも別会社の駅の場合があります。',
          'ICカードは多くの地域交通で便利ですが、対応範囲は異なり、全国共通の新幹線切符ではありません。実際の経路で普通の切符とパスを比較。',
          '一日に主なエリアを一つ。場所の経路ボタンから公共交通や徒歩を選び、出発前に入口まで確認しましょう。',
        ],
      },
      th: {
        title: 'รถไฟเที่ยวแรก: อ่านเส้นทางให้ครบ',
        items: [
          'ดูชื่อสาย ทิศทาง ชานชาลา และทางออก ไม่ใช่แค่ชื่อสถานี สถานีชื่อคล้ายกันของคนละบริษัทอาจอยู่คนละจุด',
          'บัตร IC สะดวกกับขนส่งท้องถิ่นหลายแห่ง แต่พื้นที่ใช้งานต่างกันและไม่ใช่ตั๋วชินคันเซ็นที่ใช้ได้ทุกขบวน เปรียบเทียบตั๋วรายเที่ยวกับพาสตามเส้นทางจริง',
          'เลือกพื้นที่หลักหนึ่งแห่งต่อวัน กดดูเส้นทางของสถานที่ เลือกขนส่งสาธารณะหรือเดิน และเช็กทางเข้าก่อนออกจากที่พัก',
        ],
      },
    },
  },
  {
    id: 'essentials',
    source: 'https://www.japan.travel/en/plan/',
    copy: {
      en: {
        title: 'Internet, money and a small day bag',
        items: [
          'Arrange roaming, a compatible SIM/eSIM or pocket Wi-Fi before relying on mobile maps. Download important addresses and booking details for offline use.',
          'Carry some cash alongside a payment card. Check overseas card settings and your provider’s fees; acceptance varies by shop and area.',
          'Carry a charger, water, weather-appropriate layers and a small bag for rubbish. Leave bulky luggage at your accommodation or use a confirmed storage option.',
        ],
      },
      ja: {
        title: '通信、お金、小さな荷物',
        items: [
          '地図に頼る前にローミング、対応SIM/eSIM、Wi-Fiルーターなどを準備。重要な住所や予約内容はオフラインでも保存。',
          'カードに加えて現金も少し用意。海外利用設定や手数料は発行会社で確認し、店や地域によって使える支払い方法が違うことを想定。',
          '充電器、飲み水、天候に合う服、小さなごみ袋を携帯。大きな荷物は宿や利用確認済みの預かり先へ。',
        ],
      },
      th: {
        title: 'อินเทอร์เน็ต เงิน และกระเป๋าเที่ยว',
        items: [
          'เตรียมโรมมิ่ง SIM/eSIM ที่รองรับเครื่อง หรือ Pocket Wi-Fi ก่อนพึ่งแผนที่มือถือ ดาวน์โหลดที่อยู่และการจองสำคัญไว้ใช้แบบออฟไลน์',
          'พกเงินสดส่วนหนึ่งคู่กับบัตร ตรวจการเปิดใช้งานต่างประเทศและค่าธรรมเนียมกับผู้ออกบัตร ร้านและพื้นที่ต่างกันอาจรับวิธีจ่ายไม่เหมือนกัน',
          'พกที่ชาร์จ น้ำดื่ม เสื้อให้เหมาะกับอากาศ และถุงขยะเล็ก ๆ ฝากกระเป๋าใหญ่กับที่พักหรือจุดรับฝากที่ตรวจสอบไว้',
        ],
      },
    },
  },
  {
    id: 'etiquette',
    source: 'https://www.japan.travel/en/responsible-travel-guide/',
    copy: {
      en: {
        title: 'At your destination: slow down and check signs',
        items: [
          'Check opening days, admission and reservations on the venue’s official site. A pin on a map does not guarantee that a place is open or accessible.',
          'Keep voices low on public transport, leave private lanes clear and ask before photographing people. Follow shoe-removal and photography signs.',
          'For step-free routes, dietary needs or onsen policies, contact the actual venue ahead. General travel advice cannot confirm every facility’s arrangements.',
        ],
      },
      ja: {
        title: '目的地では：表示を見てゆっくりと',
        items: [
          '開館日、料金、予約は施設の公式サイトで確認。地図に載っていても営業や利用可能な経路が保証されるわけではありません。',
          '公共交通では静かに、私道をふさがず、人の撮影は許可を。靴を脱ぐ場所や撮影の表示を守りましょう。',
          '段差のない経路、食事の配慮、温泉の利用条件は施設へ事前連絡を。一般的な案内だけでは個別の対応を確認できません。',
        ],
      },
      th: {
        title: 'ถึงจุดเที่ยว: อ่านป้ายและเที่ยวอย่างใส่ใจ',
        items: [
          'ตรวจวันเปิด ค่าเข้า และการจองจากเว็บไซต์สถานที่ การมีหมุดบนแผนที่ไม่ได้ยืนยันว่าเปิดหรือมีเส้นทางที่ทุกคนเข้าได้',
          'พูดเบาบนขนส่งสาธารณะ ไม่กีดขวางพื้นที่ส่วนบุคคล ขออนุญาตก่อนถ่ายคน และปฏิบัติตามป้ายถอดรองเท้าหรือห้ามถ่ายภาพ',
          'หากต้องการเส้นทางไร้บันได อาหารเฉพาะ หรือข้อมูลกฎออนเซ็น ให้ติดต่อสถานที่โดยตรงก่อนเดินทาง คำแนะนำทั่วไปยืนยันบริการรายแห่งไม่ได้',
        ],
      },
    },
  },
  {
    id: 'help',
    source: 'https://www.japan.travel/en/plan/emergencies/',
    copy: {
      en: {
        title: 'When you need help',
        items: [
          'For police emergencies in Japan, call 110. For an ambulance or fire emergency, call 119. State your location clearly and follow the operator’s instructions.',
          'For visitor assistance, the JNTO Japan Visitor Hotline is 050-3816-2787, available 24 hours. Check the official page for supported languages and current services.',
          'Save your accommodation address, insurer’s assistance number and a trusted contact offline. Follow local alerts and instructions during earthquakes, typhoons or transport disruption.',
        ],
      },
      ja: {
        title: '困ったとき',
        items: [
          '日本国内で警察の緊急通報は110、救急・消防は119。場所を明確に伝え、担当者の指示に従ってください。',
          '旅行者の支援はJNTO Japan Visitor Hotline 050-3816-2787（24時間）。対応言語やサービスは公式ページで確認。',
          '宿の住所、保険の連絡先、信頼できる人の連絡先をオフライン保存。地震、台風、交通障害時は現地の警報や指示に従いましょう。',
        ],
      },
      th: {
        title: 'เมื่อต้องการความช่วยเหลือ',
        items: [
          'เหตุฉุกเฉินในญี่ปุ่น โทร 110 สำหรับตำรวจ และ 119 สำหรับรถพยาบาลหรือดับเพลิง แจ้งตำแหน่งให้ชัดและทำตามเจ้าหน้าที่',
          'JNTO Japan Visitor Hotline โทร 050-3816-2787 ให้ความช่วยเหลือนักท่องเที่ยวตลอด 24 ชั่วโมง ตรวจภาษาและบริการปัจจุบันจากหน้าทางการ',
          'เก็บที่อยู่ที่พัก เบอร์ช่วยเหลือของประกัน และผู้ติดต่อที่ไว้ใจได้แบบออฟไลน์ หากเกิดแผ่นดินไหว ไต้ฝุ่น หรือขนส่งหยุด ให้ทำตามประกาศท้องถิ่น',
        ],
      },
    },
  },
]
