# Vietnamese, French and Spanish safety-copy review — 2026-11-16

Scope: compare the English source with Vietnamese, French and Spanish in `first-visit-help.ts`, `arrival-guides.ts`, `visit-access.json` and `visit-details.ts`, prioritizing transport, accessibility, age limits and negation. This is a model review, not native-speaker certification or a fresh verification of the underlying English facts. The corrections below have been applied; the before/after text is retained as historical review evidence. Korean and Chinese were outside this review. Backup/privacy dictionary copy is not present in the four assigned files and was not audited.

## Material findings and proposed replacements

1. **High — `visitDetails['tokyo-museum'].accessibility.vi`**: the warning that some ramps are steep is lost.
   - Before: `Nhà vệ sinh dành cho người khuyết tật trong các tòa nhà triển lãm ngoại trừ Hyokeikan. Một số lối vào có đường dốc; yêu cầu nhân viên giúp đỡ. Có sẵn dịch vụ cho mượn xe lăn.`
   - After: `Có nhà vệ sinh phù hợp cho người khuyết tật trong các tòa nhà triển lãm, trừ Hyokeikan. Một số lối vào có đường dốc cao; hãy nhờ nhân viên hỗ trợ. Có xe lăn cho mượn.`

2. **Medium — `visitDetails['pref:miyagi:zuihoden'].accessibility.fr`** (in `visit-access.json`): `dont` makes the 30 interior steps appear included in the 80 approach steps, while English says they are additional.
   - Before: `L'approche comporte environ 80 marches raides, dont environ 30 autres dans l'enceinte. L'opérateur prévient que les visites en fauteuil roulant sont très difficiles.`
   - After: `L’approche comporte environ 80 marches raides, auxquelles s’ajoutent environ 30 marches dans l’enceinte. L’exploitant indique qu’une visite en fauteuil roulant est très difficile.`

3. **Medium — `visitDetails['pref:wakayama:kongobuji-temple'].access.vi`** (in `visit-access.json`): `cáp treo` commonly means an aerial cableway, whereas English says cable car and the French/Spanish copies describe a funicular. Proposed wording names a rail funicular without inventing a route change.
   - Before: `Từ Gokurakubashi đi cáp treo đến Koyasan, sau đó đi xe buýt Nankai Rinkan đến Kongobuji-mae.`
   - After: `Từ Gokurakubashi, đi tàu cáp leo núi đến Koyasan, sau đó đi xe buýt Nankai Rinkan đến Kongobuji-mae.`

4. **Medium — `visitDetails['pref:tottori:tottori-sand-dunes'].access.vi`** (in `visit-access.json`): `dịch vụ hoàn trả` describes a refund/return-of-goods service rather than the return bus.
   - Before: `Đi xe buýt từ Ga Tottori đến khu vực cồn cát, mất khoảng 20 phút. Kiểm tra dịch vụ hoàn trả trước khi đi bộ trên cồn cát.`
   - After: `Đi xe buýt từ ga Tottori đến khu vực cồn cát, mất khoảng 20 phút. Kiểm tra chuyến xe buýt trở về trước khi đi bộ trên cồn cát.`

5. **Medium — `visitDetails['hokkaido-museum'].accessibility.vi`**: `nhà vệ sinh thuận tiện` means convenient toilets and does not convey accessibility for disabled visitors.
   - Before: `Sử dụng hệ thống liên lạc nội bộ trước khi sử dụng thang máy dành cho xe lăn. Cho mượn xe lăn/xe đẩy tại lễ tân tầng 1; nhà vệ sinh thuận tiện ở tầng 1 và 2.`
   - After: `Dùng máy liên lạc trước khi sử dụng thang nâng dành cho xe lăn. Có xe lăn và xe đẩy cho mượn tại quầy lễ tân tầng 1; nhà vệ sinh phù hợp cho người khuyết tật ở tầng 1 và 2.`

6. **Medium — `firstVisitHelp.copy.fr.items[2]`**: the French says to save the insurer's assistance, omitting that the assistance **number** is needed offline.
   - Before: `Enregistrez hors ligne adresse d’hébergement, assistance de l’assureur et contact de confiance. Suivez les alertes et consignes locales en cas de séisme, typhon ou perturbation des transports.`
   - After: `Enregistrez hors ligne l’adresse de votre hébergement, le numéro d’assistance de votre assureur et un contact de confiance. Suivez les alertes et consignes locales en cas de séisme, de typhon ou de perturbation des transports.`

7. **Medium — `visitDetails['pref:saitama:railway-museum'].booking.fr` and `.es`** (in `visit-access.json`): `journées portes ouvertes` / `días de puertas abiertas` can mean special open-house days; English means ordinary days when the museum is open.
   - French before: `L'entrée est vendue en ligne, dans les supérettes et au musée lors des journées portes ouvertes. Les billets d'entrée avec réservation d'expériences sélectionnés sont vendus uniquement via Seven Ticket ; un billet ordinaire ne réserve pas de simulateur.`
   - French after: `Les billets d’entrée sont vendus en ligne, dans les supérettes et au musée les jours d’ouverture. Certains billets avec réservation d’activité sont vendus uniquement via Seven Ticket ; un billet ordinaire ne réserve pas de simulateur.`
   - Spanish before: `La entrada se vende en línea, en tiendas de conveniencia y en el museo los días de puertas abiertas. Los boletos de admisión para reserva de experiencias seleccionadas se venden únicamente a través de Seven Ticket; un billete normal no reserva simulador.`
   - Spanish after: `Las entradas se venden en línea, en tiendas de conveniencia y en el museo los días que abre. Algunas entradas con reserva de actividades se venden únicamente a través de Seven Ticket; una entrada ordinaria no reserva un simulador.`

8. **Medium — `visitDetails['pref:miyazaki:aoshima-shrine'].access.vi`** (in `visit-access.json`): `tàu khứ hồi` suggests round-trip tickets/trains rather than specifically checking trains back.
   - Before: `Hãy sử dụng Ga Aoshima trên Tuyến JR Nichinan, sau đó đi bộ về phía hòn đảo và đền thờ, mất khoảng mười phút. Kiểm tra các chuyến tàu khứ hồi trước khi khám phá.`
   - After: `Xuống ga Aoshima trên tuyến JR Nichinan, sau đó đi bộ khoảng mười phút về phía đảo và đền thờ. Kiểm tra các chuyến tàu trở về trước khi tham quan.`

## Review limits

The 110/119 emergency numbers, JNTO hotline number and 24-hour qualifier are present in all three reviewed languages. The assigned arrival-route entries preserve the major airport/terminal, fare and last-service cautions on model review. Other ambiguous wording may remain; absence from this list is not native certification. No accessibility claim, current price, operator timetable or event date was independently reverified for this translation-only task.

## Applied — 2026-11-16

All eight findings above were applied to their named locale values, including both French and Spanish in finding 7. These language-only edits did not refresh factual review dates. This remains model review; native-speaker acceptance is pending.
