export type SiteLocale = 'en' | 'de' | 'es' | 'fr' | 'it' | 'ja' | 'pt' | 'zh'

type UiCopy = {
  billingPeriod: string
  annual: string
  monthly: string
  freeTrial: string
  fullAccess: string
  regionalPricing: string
  annualTerms: string
  monthlyTerms: string
  perYear: string
  perMonth: string
  features: string[]
  joinWaitlist: string
  joining: string
  detectingRegion: string
  showingCountryPricing: (country: string) => string
  usePreciseLocation: string
  standardPricing: string
  billingFinePrint: string
  emailAddress: string
  invalidEmail: string
  alreadyWaiting: string
  joined: string
  genericError: string
  networkError: string
}

const en: UiCopy = {
  billingPeriod: 'Billing period', annual: 'Annual', monthly: 'Monthly', freeTrial: '3-day free trial',
  fullAccess: 'Full access', regionalPricing: 'Regional pricing applied',
  annualTerms: '3-day free trial, then billed yearly · cancel anytime',
  monthlyTerms: 'Billed monthly · cancel anytime', perYear: '/year', perMonth: '/month',
  features: ['Unlimited song memories', 'Write what the song means to you & when you first heard it', 'Attach photos & videos to any memory', 'Tag the place where you first heard it', "Share your memories to the song's public feed", 'Read how others remember the same song', 'Add custom songs not on Apple Music', 'Organise memories into collections', 'Daily streak tracking'],
  joinWaitlist: 'Join the waitlist', joining: 'Joining…', detectingRegion: 'Detecting your region…',
  showingCountryPricing: (country) => `Showing ${country} pricing`,
  usePreciseLocation: 'Showing standard (USD) pricing — use my precise location',
  standardPricing: 'Showing standard (USD) pricing',
  billingFinePrint: 'Billed through the App Store / Google Play. Prices shown in your local currency where available.',
  emailAddress: 'Email address', invalidEmail: 'Please enter a valid email address.',
  alreadyWaiting: "You're already part of the waitlist!", joined: "You're on the list — check your inbox.",
  genericError: 'Something went wrong. Please try again.', networkError: 'Network error. Please try again.',
}

const copies: Record<SiteLocale, UiCopy> = {
  en,
  de: { ...en, billingPeriod: 'Abrechnungszeitraum', annual: 'Jährlich', monthly: 'Monatlich', freeTrial: '3-tägige kostenlose Testversion', fullAccess: 'Voller Zugriff', regionalPricing: 'Regionale Preise angewendet', annualTerms: '3-tägige kostenlose Testversion, dann jährliche Abrechnung · jederzeit kündbar', monthlyTerms: 'Monatliche Abrechnung · jederzeit kündbar', perYear: '/Jahr', perMonth: '/Monat', features: ['Unbegrenzte Song-Erinnerungen', 'Schreiben Sie, was das Lied für Sie bedeutet und wann Sie es zum ersten Mal gehört haben', 'Fügen Sie Fotos und Videos zu jeder Erinnerung hinzu', 'Markieren Sie den Ort, an dem Sie es zum ersten Mal gehört haben', 'Teilen Sie Ihre Erinnerungen im öffentlichen Feed des Liedes', 'Lesen Sie, wie sich andere an dasselbe Lied erinnern', 'Fügen Sie eigene Songs hinzu, die nicht auf Apple Music verfügbar sind', 'Organisieren Sie Erinnerungen in Sammlungen', 'Tägliches Streak-Tracking'], joinWaitlist: 'Tragen Sie sich auf die Warteliste ein', joining: 'Wird eingetragen…', detectingRegion: 'Erkennen Ihrer Region…', showingCountryPricing: (country) => `Preise für ${country}`, usePreciseLocation: 'Standardpreise (USD) · genauen Standort verwenden', standardPricing: 'Standardpreise (USD)', billingFinePrint: 'Abrechnung über den App Store / Google Play. Sofern verfügbar, werden die Preise in Ihrer Landeswährung angezeigt.', emailAddress: 'E-Mail-Adresse', invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', alreadyWaiting: 'Sie stehen bereits auf der Warteliste!', joined: 'Sie sind auf der Liste · prüfen Sie Ihren Posteingang.', genericError: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.', networkError: 'Netzwerkfehler. Bitte versuchen Sie es erneut.' },
  es: { ...en, billingPeriod: 'Periodo de facturación', annual: 'Anual', monthly: 'Mensual', freeTrial: 'Prueba gratuita de 3 días', fullAccess: 'Acceso completo', regionalPricing: 'Precios regionales aplicados', annualTerms: 'Prueba gratuita de 3 días y luego facturación anual · cancela cuando quieras', monthlyTerms: 'Facturación mensual · cancela cuando quieras', perYear: '/año', perMonth: '/mes', features: ['Recuerdos musicales ilimitados', 'Escribe qué significa la canción para ti y cuándo la escuchaste por primera vez', 'Adjunta fotos y videos a cualquier recuerdo', 'Etiqueta el lugar donde la escuchaste por primera vez', 'Comparte tus recuerdos en el feed público de la canción', 'Descubre cómo otros recuerdan la misma canción', 'Agrega canciones que no están en Apple Music', 'Organiza recuerdos en colecciones', 'Seguimiento de rachas diarias'], joinWaitlist: 'Únete a la lista de espera', joining: 'Registrando…', detectingRegion: 'Detectando tu región…', showingCountryPricing: (country) => `Mostrando precios de ${country}`, usePreciseLocation: 'Precios estándar (USD) · usar mi ubicación precisa', standardPricing: 'Precios estándar (USD)', billingFinePrint: 'Facturado mediante App Store / Google Play. Los precios aparecen en tu moneda local cuando está disponible.', emailAddress: 'Correo electrónico', invalidEmail: 'Introduce un correo electrónico válido.', alreadyWaiting: 'Ya estás en la lista de espera.', joined: 'Ya estás en la lista · revisa tu correo.', genericError: 'Algo salió mal. Inténtalo de nuevo.', networkError: 'Error de red. Inténtalo de nuevo.' },
  fr: { ...en, billingPeriod: 'Période de facturation', annual: 'Annuel', monthly: 'Mensuel', freeTrial: 'Essai gratuit de 3 jours', fullAccess: 'Accès complet', regionalPricing: 'Tarification régionale appliquée', annualTerms: 'Essai gratuit de 3 jours, puis facturation annuelle · annulation à tout moment', monthlyTerms: 'Facturation mensuelle · annulation à tout moment', perYear: '/an', perMonth: '/mois', features: ['Souvenirs musicaux illimités', "Écrivez ce que la chanson signifie pour vous et quand vous l'avez entendue pour la première fois", "Joignez des photos et des vidéos à n'importe quel souvenir", "Indiquez l'endroit où vous l'avez entendue pour la première fois", 'Partagez vos souvenirs dans le fil public de la chanson', 'Découvrez comment les autres se souviennent de la même chanson', 'Ajoutez des chansons absentes d’Apple Music', 'Organisez vos souvenirs en collections', 'Suivi des séries quotidiennes'], joinWaitlist: "Rejoignez la liste d'attente", joining: 'Inscription…', detectingRegion: 'Détection de votre région…', showingCountryPricing: (country) => `Tarifs affichés pour ${country}`, usePreciseLocation: 'Tarifs standard (USD) · utiliser ma position précise', standardPricing: 'Tarifs standard (USD)', billingFinePrint: "Facturé via l'App Store / Google Play. Les prix sont affichés dans votre devise locale lorsqu'elle est disponible.", emailAddress: 'Adresse e-mail', invalidEmail: 'Saisissez une adresse e-mail valide.', alreadyWaiting: "Vous êtes déjà sur la liste d'attente !", joined: 'Vous êtes sur la liste · consultez votre boîte de réception.', genericError: 'Une erreur est survenue. Réessayez.', networkError: 'Erreur réseau. Réessayez.' },
  it: { ...en, billingPeriod: 'Periodo di fatturazione', annual: 'Annuale', monthly: 'Mensile', freeTrial: 'Prova gratuita di 3 giorni', fullAccess: 'Accesso completo', regionalPricing: 'Prezzi regionali applicati', annualTerms: 'Prova gratuita di 3 giorni, poi fatturazione annuale · annulla quando vuoi', monthlyTerms: 'Fatturazione mensile · annulla quando vuoi', perYear: '/anno', perMonth: '/mese', features: ['Ricordi musicali illimitati', "Scrivi cosa significa per te la canzone e quando l'hai ascoltata per la prima volta", 'Allega foto e video a qualsiasi ricordo', "Indica il luogo in cui l'hai ascoltata per la prima volta", 'Condividi i tuoi ricordi nel feed pubblico della canzone', 'Scopri come gli altri ricordano la stessa canzone', 'Aggiungi brani non presenti su Apple Music', 'Organizza i ricordi in raccolte', 'Monitoraggio delle serie giornaliere'], joinWaitlist: "Iscriviti alla lista d'attesa", joining: 'Iscrizione…', detectingRegion: 'Rilevamento della tua regione…', showingCountryPricing: (country) => `Prezzi mostrati per ${country}`, usePreciseLocation: 'Prezzi standard (USD) · usa la mia posizione precisa', standardPricing: 'Prezzi standard (USD)', billingFinePrint: 'Fatturazione tramite App Store / Google Play. I prezzi sono mostrati nella valuta locale, ove disponibile.', emailAddress: 'Indirizzo e-mail', invalidEmail: 'Inserisci un indirizzo e-mail valido.', alreadyWaiting: "Sei già nella lista d'attesa!", joined: 'Sei nella lista · controlla la posta.', genericError: 'Qualcosa è andato storto. Riprova.', networkError: 'Errore di rete. Riprova.' },
  ja: { ...en, billingPeriod: '請求期間', annual: '年間', monthly: '月間', freeTrial: '3日間無料トライアル', fullAccess: 'すべての機能', regionalPricing: '地域別価格を適用中', annualTerms: '3日間無料、その後は年払い · いつでもキャンセル可能', monthlyTerms: '月払い · いつでもキャンセル可能', perYear: '/年', perMonth: '/月', features: ['曲の思い出を無制限に記録', '曲の意味や初めて聴いたときのことを記録', '思い出に写真や動画を添付', '初めて聴いた場所を記録', '曲の公開フィードで思い出を共有', '同じ曲をほかの人がどう覚えているか閲覧', 'Apple Musicにない曲を追加', '思い出をコレクションに整理', '毎日の継続記録'], joinWaitlist: 'ウェイティングリストに参加', joining: '登録中…', detectingRegion: '地域を確認中…', showingCountryPricing: (country) => `${country}の価格を表示中`, usePreciseLocation: '標準価格（USD）· 正確な位置情報を使用', standardPricing: '標準価格（USD）', billingFinePrint: 'App Store / Google Playで請求されます。対応地域では現地通貨で表示されます。', emailAddress: 'メールアドレス', invalidEmail: '有効なメールアドレスを入力してください。', alreadyWaiting: 'すでにウェイティングリストに登録されています。', joined: '登録しました。受信トレイをご確認ください。', genericError: '問題が発生しました。もう一度お試しください。', networkError: 'ネットワークエラーです。もう一度お試しください。' },
  pt: { ...en, billingPeriod: 'Período de cobrança', annual: 'Anual', monthly: 'Mensal', freeTrial: 'Teste grátis de 3 dias', fullAccess: 'Acesso total', regionalPricing: 'Preço regional aplicado', annualTerms: 'Teste grátis de 3 dias, depois cobrança anual · cancele quando quiser', monthlyTerms: 'Cobrança mensal · cancele quando quiser', perYear: '/ano', perMonth: '/mês', features: ['Memórias musicais ilimitadas', 'Escreva o que a música significa para você e quando a ouviu pela primeira vez', 'Anexe fotos e vídeos a qualquer memória', 'Marque o lugar onde a ouviu pela primeira vez', 'Compartilhe suas memórias no feed público da música', 'Veja como outras pessoas lembram da mesma música', 'Adicione músicas que não estão no Apple Music', 'Organize memórias em coleções', 'Acompanhamento de sequência diária'], joinWaitlist: 'Entre na lista de espera', joining: 'Entrando…', detectingRegion: 'Detectando sua região…', showingCountryPricing: (country) => `Mostrando preços de ${country}`, usePreciseLocation: 'Preços padrão (USD) · usar minha localização precisa', standardPricing: 'Preços padrão (USD)', billingFinePrint: 'Cobrado pela App Store / Google Play. Os preços são exibidos na moeda local quando disponível.', emailAddress: 'Endereço de e-mail', invalidEmail: 'Digite um endereço de e-mail válido.', alreadyWaiting: 'Você já está na lista de espera!', joined: 'Você está na lista · verifique sua caixa de entrada.', genericError: 'Algo deu errado. Tente novamente.', networkError: 'Erro de rede. Tente novamente.' },
  zh: { ...en, billingPeriod: '计费周期', annual: '年度', monthly: '每月', freeTrial: '免费试用3天', fullAccess: '完整访问权限', regionalPricing: '已应用地区定价', annualTerms: '免费试用3天，之后按年计费 · 可随时取消', monthlyTerms: '按月计费 · 可随时取消', perYear: '/年', perMonth: '/月', features: ['无限记录歌曲回忆', '写下歌曲对你的意义以及第一次听到它的时刻', '为任何回忆添加照片和视频', '标记第一次听到歌曲的地点', '将回忆分享到歌曲的公开动态', '看看其他人如何记住同一首歌', '添加Apple Music中没有的歌曲', '将回忆整理到收藏中', '每日连续记录'], joinWaitlist: '加入等候名单', joining: '正在加入…', detectingRegion: '正在检测你的地区…', showingCountryPricing: (country) => `正在显示${country}的价格`, usePreciseLocation: '显示标准价格（美元）· 使用精确位置', standardPricing: '显示标准价格（美元）', billingFinePrint: '通过App Store / Google Play计费。支持时会显示当地货币价格。', emailAddress: '电子邮件地址', invalidEmail: '请输入有效的电子邮件地址。', alreadyWaiting: '你已经在等候名单中了！', joined: '你已加入名单 · 请查看收件箱。', genericError: '出现问题，请重试。', networkError: '网络错误，请重试。' },
}

export function getDocumentLocale(): SiteLocale {
  if (typeof document === 'undefined') return 'en'
  const locale = document.documentElement.lang.split('-')[0] as SiteLocale
  return copies[locale] ? locale : 'en'
}

export function getUiCopy(locale = getDocumentLocale()): UiCopy {
  return copies[locale] ?? en
}
