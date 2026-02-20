// ============================================================
// AMMI DATA — All Dummy Content
// ============================================================
// This file contains ALL placeholder content for Ammi's memory profile.
// When real interview data is available, replace the values here.
// The app automatically pulls from this file — no other files need changing.
//
// REAL_TRANSCRIPT: Replace story, quote, and excerpt fields below
// with actual parsed content from Ammi's recorded interview.
// REAL_PHOTO: Replace the avatar URL with Ammi's actual photograph.
// ============================================================

// ─── PROFILE ────────────────────────────────────────────────
export const AMMI_PROFILE = {
    name: 'Ammi',
    // REAL_PHOTO: Replace this with the actual uploaded photo URL or import
    avatar: null, // null = shows initials/generated avatar
    birthCity: 'Lahore',
    birthYear: '1952',
    tagline: 'Maa ki dua, jannat ki hawa',
    taglineUrdu: 'ماں کی دعا، جنت کی ہوا',
};

// ─── HERO QUOTE CARDS ───────────────────────────────────────
// REAL_TRANSCRIPT: Replace with Ammi's actual favourite sayings
export const QUOTE_CARDS = [
    {
        id: 1,
        text: 'Mehnat karo, Allah pe bharosa rakho',
        textUrdu: 'محنت کرو، اللہ پے بھروسہ رکھو',
        attr: 'Ammi, always',
    },
    {
        id: 2,
        text: 'The whole house smelled of cardamom before Fajr',
        textUrdu: 'فجر سے پہلے پورا گھر الائچی کی خوشبو سے بھرا ہوتا تھا',
        attr: 'Morning ritual',
    },
    {
        id: 3,
        text: 'Izzat kamaana mushkil hai, gawana aasaan',
        textUrdu: 'عزت کمانا مشکل ہے، گوانا آسان',
        attr: 'Life advice',
    },
];

// ─── MEMORY VAULT CHAPTERS ──────────────────────────────────
// REAL_TRANSCRIPT: Replace story and quote fields with actual interview content
// The 'locked' field marks chapters only revealed after full interview completion
export const MEMORY_CHAPTERS = [
    {
        id: 1,
        urduTitle: 'شروعات',
        romanTitle: 'Shuruaat',
        englishSubtitle: 'Opening',
        locked: false,
        story:
            'Ammi was born in a small house in Lahore in 1952. She remembers the smell of her mother\'s kitchen — daal and fresh roti — and the sound of the azaan echoing across the mohalla at Fajr.',
        quote: 'Woh ghar chhota tha, lekin pyar bada tha.',
        quoteUrdu: 'وہ گھر چھوٹا تھا، لیکن پیار بڑا تھا۔',
    },
    {
        id: 2,
        urduTitle: 'بچپن',
        romanTitle: 'Bacchpan',
        englishSubtitle: 'Childhood',
        locked: false,
        story:
            // REAL_TRANSCRIPT: Replace with Ammi's actual childhood memories
            'She grew up running barefoot through narrow mohalla streets, playing with neighbours\' children until the azaan called everyone home. School was her favourite escape — she won first position in class three years in a row.',
        quote: 'Padhna meri azaadi thi.',
        quoteUrdu: 'پڑھنا میری آزادی تھی۔',
    },
    {
        id: 3,
        urduTitle: 'مشکل وقت',
        romanTitle: 'Mushkil Waqt',
        englishSubtitle: 'Hard Times',
        locked: false,
        story:
            // REAL_TRANSCRIPT: Replace with real hardship stories from interview
            'Partition cast long shadows on her family. She never spoke of that time directly, but when the lights went out in summer, she would hum old folk songs her mother sang. Some grief is too big for words.',
        quote: 'Sabar ka phal meetha hota hai.',
        quoteUrdu: 'صبر کا پھل میٹھا ہوتا ہے۔',
    },
    {
        id: 4,
        urduTitle: 'ایمان',
        romanTitle: 'Iman',
        englishSubtitle: 'Faith',
        locked: false,
        story:
            'She never missed Fajr. Not once that her children could remember. She said Allah\'s company at dawn was worth more than any extra hour of sleep.',
        quote: 'Mehnat karo, Allah pe bharosa rakho.',
        quoteUrdu: 'محنت کرو، اللہ پے بھروسہ رکھو۔',
    },
    {
        id: 5,
        urduTitle: 'گھر',
        romanTitle: 'Ghar',
        englishSubtitle: 'Family & Love',
        locked: false,
        story:
            // REAL_TRANSCRIPT: Replace with family memories and loved ones' names
            'Her kitchen was the heart of the house. No one left hungry. Neighbours, relatives, strangers — all fed. She measured love in portions of food and cups of chai.',
        quote: 'Ghar woh hota hai jahan dil jagah le.',
        quoteUrdu: 'گھر وہ ہوتا ہے جہاں دل جگہ لے۔',
    },
    {
        id: 6,
        urduTitle: 'کام',
        romanTitle: 'Kaam',
        englishSubtitle: 'Work & Achievement',
        locked: false,
        story:
            // REAL_TRANSCRIPT: Replace with actual achievements from interview
            'She ran the household like a quiet CEO — budget, education, health, relationships. When her eldest got into university, she prayed two extra nafl in gratitude. That was her achievement too.',
        quote: 'Bacchon ki tarakki meri tarakki hai.',
        quoteUrdu: 'بچوں کی ترقی میری ترقی ہے۔',
    },
    {
        id: 7,
        urduTitle: 'حکمت',
        romanTitle: 'Hikmat',
        englishSubtitle: 'Wisdom',
        locked: false,
        story:
            'When asked the secret to her resilience, she paused and said: \'Rona bhi zaroor hai — lekin uthna bhi zaroor hai.\'',
        quote: 'Izzat kamaana mushkil hai, gawana aasaan.',
        quoteUrdu: 'عزت کمانا مشکل ہے، گوانا آسان۔',
    },
    {
        id: 8,
        urduTitle: 'پشیمانی',
        romanTitle: 'Pashemaani',
        englishSubtitle: 'Regrets',
        locked: true, // Revealed only after full interview is completed
        story:
            // REAL_TRANSCRIPT: Only from full interview — handle with care and sensitivity
            'This chapter captures the things Ammi carries quietly — the apologies unspoken, the dreams left behind. Added with full consent after the complete interview session.',
        quote: 'Har galti ek sabaq hai.',
        quoteUrdu: 'ہر غلطی ایک سبق ہے۔',
    },
    {
        id: 9,
        urduTitle: 'لطیفے',
        romanTitle: 'Latife',
        englishSubtitle: 'Jokes & Light',
        locked: true, // Revealed only after full interview is completed
        story:
            // REAL_TRANSCRIPT: Her signature jokes and funny stories — from interview
            'Ammi could make a whole room laugh with one deadpan remark. Her favourite joke involved a rooster, Lahore traffic, and a very confused uncle.',
        quote: 'Hanso — Allah ko hansi pasand hai.',
        quoteUrdu: 'ہنسو — اللہ کو ہنسی پسند ہے۔',
    },
    {
        id: 10,
        urduTitle: 'آخری الفاظ',
        romanTitle: 'Aakhri Alfaaz',
        englishSubtitle: 'Final Words',
        locked: true, // Revealed only after full interview is completed
        story:
            // REAL_TRANSCRIPT: Her message to family — recorded verbatim from interview
            'What she wants her grandchildren to know. What she wants them to carry. Her dua for the family — in her own words, in her own voice.',
        quote: 'Meri dua hamesha tumhare saath hai.',
        quoteUrdu: 'میری دعا ہمیشہ تمہارے ساتھ ہے۔',
    },
];

// ─── PLACEHOLDER CHAT RESPONSES (Roman Urdu mode) ───────────
// Used when language is set to UR and no API response arrives yet
// REAL_TRANSCRIPT: These will be replaced by live Claude API responses
export const URDU_PLACEHOLDER_RESPONSES = [
    'Beta, shukar hai tumhara yaad aaya. Chai peena — thando ho jao pehle.',
    'Allah ka shukar hai. Tumhari yaad bahut aayi thi aaj.',
    'Baat karo mujhse. Kya ho raha hai zindagi mein?',
];
