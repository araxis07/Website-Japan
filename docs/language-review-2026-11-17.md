# Safety-sensitive translation review — 2026-11-17

Scope: model comparison of Korean, Simplified Chinese, Vietnamese, French and Spanish against the English wording in emergency help, arrival routes and effective visit information. These corrections are model-reviewed, not native-speaker certification or a new verification of the English facts. Previously corrected 16 November findings were not repeated. No source, ID or factual review date was changed.

## Applied locale-only corrections

- `visitDetails['pref:ibaraki:kairakuen'].access.es` — Travel duration, not waiting time.
  - Before: Desde la estación JR Mito, espere unos 20 minutos en autobús hasta Kairakuen.
  - After: Desde la estación JR Mito, calcule unos 20 minutos en autobús hasta Kairakuen.

- `visitDetails['pref:yamanashi:takeda-shrine'].access.es` — Travel duration, not waiting time.
  - Before: Desde la salida norte de JR Kofu, espere unos 30 minutos a pie o diez minutos en autobús hacia el Santuario Takeda. Consulta el horario del autobús de vuelta.
  - After: Desde la salida norte de JR Kofu, calcule unos 30 minutos a pie o diez minutos en autobús hacia el Santuario Takeda. Consulte el horario del autobús de vuelta.

- `visitDetails['pref:hiroshima:hiroshima-peace-memorial-park'].access.es` — Transit duration, not waiting time.
  - Before: Desde la estación de Hiroshima, tome un tranvía o autobús hacia Genbaku-Dome-mae y luego camine hacia el parque. Espere unos 20 minutos para el tramo de tránsito.
  - After: Desde la estación de Hiroshima, tome un tranvía o autobús hacia Genbaku-Dome-mae y luego camine hacia el parque. Calcule unos 20 minutos para el trayecto en transporte.

- `visitDetails['pref:miyazaki:miyazaki-jingu'].access.es` — Allow walking time rather than wait.
  - Before: Utilice la estación Miyazaki-Jingu de la línea principal JR Nippo. La puerta del santuario es visible desde el área de la estación; espere hasta 15 minutos para caminar hasta el santuario.
  - After: Utilice la estación Miyazaki-Jingu de la línea principal JR Nippo. La puerta del santuario es visible desde el área de la estación; prevea hasta 15 minutos a pie hasta el santuario.

- `visitDetails['pref:fukushima:ouchi-juku'].access.vi` — The warning concerns the last return connection, not a round trip.
  - Before: Đi Đường sắt Aizu đến Yunokami-Onsen, sau đó đi xe buýt hoặc taxi đến Ouchi-juku. Kiểm tra hoạt động của xe buýt theo mùa và chuyến khứ hồi cuối cùng trước khi khởi hành.
  - After: Đi Đường sắt Aizu đến Yunokami-Onsen, sau đó đi xe buýt hoặc taxi đến Ouchi-juku. Kiểm tra hoạt động của xe buýt theo mùa và chuyến nối cuối cùng để trở về trước khi khởi hành.

- `visitDetails['pref:ibaraki:hitachi-seaside-park'].hours.fr` — Make the end of August unambiguous.
  - Before: 9h30-17h00 de mars au 17 juillet et de septembre à octobre ; jusqu'à 18h00 du 18 juillet au août, 16h30 de novembre à février. Généralement fermé le mardi ; des exceptions saisonnières et des fermetures pour maintenance s’appliquent.
  - After: 9h30-17h00 de mars au 17 juillet et de septembre à octobre ; jusqu'à 18h00 du 18 juillet à fin août, 16h30 de novembre à février. Généralement fermé le mardi ; des exceptions saisonnières et des fermetures pour maintenance s’appliquent.

- `visitDetails['pref:saitama:railway-museum'].accessibility.vi` — Use loan wording for wheelchairs; retain paid Babycal rental and registration for strollers.
  - Before: Xe lăn và xe đẩy được phép. Dịch vụ cho thuê xe lăn có sẵn ở lối vào; dịch vụ cho thuê xe đẩy sử dụng dịch vụ Babycal trả phí và yêu cầu đăng ký.
  - After: Xe lăn và xe đẩy được phép. Có xe lăn cho mượn ở lối vào; dịch vụ cho thuê xe đẩy sử dụng dịch vụ Babycal trả phí và yêu cầu đăng ký.

- `visitDetails['makishi'].accessibility.vi` — Use loan wording for wheelchairs; retain the no-stroller-loan warning.
  - Before: Nhà vệ sinh dành cho người khuyết tật, dịch vụ cho thuê xe lăn và phòng cho con bú đều được liệt kê. Xe đẩy không có sẵn để cho mượn; xác nhận lộ trình cụ thể với ban quản lý chợ.
  - After: Nhà vệ sinh dành cho người khuyết tật, xe lăn cho mượn và phòng cho con bú đều được liệt kê. Xe đẩy không có sẵn để cho mượn; xác nhận lộ trình cụ thể với ban quản lý chợ.

- `visitDetails['osaka-museum'].accessibility.vi` — Use loan wording for wheelchairs.
  - Before: Nhà vệ sinh dành cho người khuyết tật ở mỗi tầng và cho thuê xe lăn. Xe đẩy có thể bị hạn chế khi phòng trưng bày đông đúc; một phòng cho con bú ở tầng một.
  - After: Nhà vệ sinh dành cho người khuyết tật ở mỗi tầng và có xe lăn cho mượn. Xe đẩy có thể bị hạn chế khi phòng trưng bày đông đúc; một phòng cho con bú ở tầng một.

- `visitDetails['tokyo-museum'].admission.fr` — The discounted student category is university students, not all students.
  - Before: Collection permanente : adultes 1 000 ¥, étudiants 500 ¥. Les expositions temporaires ont des tarifs distincts ; vérifiez les justificatifs et les conditions de réduction.
  - After: Collection permanente : adultes 1 000 ¥, étudiants universitaires 500 ¥. Les expositions temporaires ont des tarifs distincts ; vérifiez les justificatifs et les conditions de réduction.

## Dictionary findings applied after coordination

- `tools.sanitized.vi` and `tools.publicExports.vi`: `số ngày` can mean the number of days, whereas English describes day numbers associated with guide places. After coordination, both values now use `số thứ tự ngày`; the remainder of each privacy explanation is unchanged.
  - `tools.sanitized.vi` before: Xuất JSON / HTML chỉ gồm địa điểm trong cẩm nang và số ngày (bỏ thông tin riêng tư)
  - `tools.sanitized.vi` after: Xuất JSON / HTML chỉ gồm địa điểm trong cẩm nang và số thứ tự ngày (bỏ thông tin riêng tư)
  - `tools.publicExports.vi` before: JSON / HTML không chứa thông tin riêng tư: chỉ giữ địa điểm trong cẩm nang và số ngày. Tên chuyến đi, ngày tháng, ghi chú, ngân sách, nơi lưu trú và điểm dừng cá nhân bị loại bỏ. Bản in/PDF và tệp lịch vẫn dùng chuyến đi hiện tại; kiểm tra riêng thông tin riêng tư trong các bản đó.
  - `tools.publicExports.vi` after: JSON / HTML không chứa thông tin riêng tư: chỉ giữ địa điểm trong cẩm nang và số thứ tự ngày. Tên chuyến đi, ngày tháng, ghi chú, ngân sách, nơi lưu trú và điểm dừng cá nhân bị loại bỏ. Bản in/PDF và tệp lịch vẫn dùng chuyến đi hiện tại; kiểm tra riêng thông tin riêng tư trong các bản đó.

## Limits

The emergency numbers, hotline, terminal transfers, main negations and checked pricing categories were compared to the existing English values. This is a prioritized model review, not proof that all translations are correct. Native-speaker and real-user review remain pending. Operator sources, accessibility conditions and prices were not newly verified.

## Separate source-reviewed update

After this translation review, the separately authorized [source follow-up](source-review-2026-11-17.md) added scoped arrival checks and refreshed the Hokkaido University Museum access field and its own provenance. The translation-only corrections above did not refresh source dates; the separate update does not certify native-language accuracy or an accessible station-to-museum route.
