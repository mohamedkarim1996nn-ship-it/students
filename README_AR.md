# دفعاتي v3

نسخة احترافية تركز على الاستخدام اليومي السريع.

## الجديد
- مجموعات/صفوف للطلاب مع فلترة حسب المجموعة.
- دفعات جزئية: لا ينتقل موعد الدورة حتى يكتمل المبلغ الشهري.
- زر «سداد المتبقي» يحسب المبلغ المتبقي تلقائياً.
- تأجيل التذكير ليوم أو 3 أيام (Snooze) بدون تغيير تاريخ الاستحقاق.
- قائمة متابعة ذكية لأقرب الطلاب الذين يحتاجون إجراء.
- استيراد مجموعة طلاب من CSV.
- قالب واتساب قابل للتخصيص من الإعدادات باستخدام {name} و{amount} و{due} و{remaining}.
- تصدير CSV يتضمن المجموعة والمتبقي والحالة.

## هيكل GitHub المطلوب
ضع محتويات هذا ZIP في جذر المستودع كما هي:

netlify.toml
netlify/functions/config.mjs
netlify/functions/schedule.mjs
student_payments_final/index.html
student_payments_final/manifest.json
...

إعدادات Netlify:
- Base directory: فارغ
- Publish directory: student_payments_final
- Functions directory: netlify/functions

لا تغيّر متغيرات البيئة الحالية:
ONESIGNAL_APP_ID
ONESIGNAL_REST_API_KEY

## استيراد CSV
يوجد نموذج داخل student_payments_final/students_template.csv.
الأعمدة المقبولة: name, phone, amount, paymentDate, group, reminderDays.
