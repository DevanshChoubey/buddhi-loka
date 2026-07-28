export const chatFormatAttention = {
  slug: "chat-format-attention",
  title: "Why We Format Chats: System, User, Assistant—and What Apollo 13 Taught Us",
  date: "November 9, 2025",
  author: "Devansh Choubey",
  category: "AI Research",
  readTime: "10 min read",
  image: "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=2000&h=1000&auto=format&fit=crop",
  content: `
    <h2>Apollo 13's Comm Loops (1970)</h2>
    <p>When an oxygen tank exploded on Apollo 13, chaos didn't win. NASA's Mission Control ran on rigid communication loops:</p>
    
    <ul>
      <li><strong>CAPCOM</strong> was the only voice to the crew.</li>
      <li><strong>Specialists</strong> (EECOM, GUIDO, etc.) debated on internal loops and routed decisions through the Flight Director.</li>
      <li>Each transmission had <strong>role + priority</strong> baked in, so in a crisis the right info reached the right ears.</li>
    </ul>
    
    <p>That structure didn't change <em>what</em> was said—it changed <strong>how attention and memory were routed under pressure</strong>.</p>
    
    <p>Chat LLMs work surprisingly similar. We add a minimal protocol:</p>
    
    <pre><code>&lt;SYS&gt; director's notes (policies, style)
&lt;USR&gt; astronaut's question
&lt;AST&gt; ground's reply</code></pre>
    
    <p>Those tags are just tokens in a single sequence, but they act like Mission Control's loops: <strong>who's speaking, to whom, and what matters</strong>.</p>
    
    <h2>What the Format Buys Us</h2>
    
    <p><strong>Clear Boundaries → Clean Learning.</strong> In supervised fine-tuning we compute loss only on the assistant span. Role tags mark that span unambiguously—no guessing where the model's response should begin.</p>
    
    <p><strong>Attention Anchors.</strong> Special tokens like <code>&lt;SYS&gt;</code> and <code>&lt;USR&gt;</code> become reliable landmarks. Long prompt? Doesn't matter. The model can re-find these markers even 10k tokens deep.</p>
    
    <p><strong>Protocol Memory.</strong> Training with the same template you use in production isn't just good practice—it teaches the model that grammar. Less surprises, more consistency.</p>
    
    <h2>Diagram: One Stream, Labeled Spans</h2>
    <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace; overflow-x: auto;">
      <div style="color: #888; margin-bottom: 10px;">← Token Stream (left to right) →</div>
      <div style="display: flex; gap: 4px; flex-wrap: wrap;">
        <span style="background: #4a1d96; padding: 8px 12px; border-radius: 4px; color: #fff;">&lt;SYS&gt;</span>
        <span style="background: #2d1b4e; padding: 8px 12px; border-radius: 4px; color: #ddd;">Always</span>
        <span style="background: #2d1b4e; padding: 8px 12px; border-radius: 4px; color: #ddd;">answer</span>
        <span style="background: #2d1b4e; padding: 8px 12px; border-radius: 4px; color: #ddd;">in</span>
        <span style="background: #2d1b4e; padding: 8px 12px; border-radius: 4px; color: #ddd;">French</span>
        <span style="background: #2d1b4e; padding: 8px 12px; border-radius: 4px; color: #ddd;">.</span>
        <span style="background: #0e7490; padding: 8px 12px; border-radius: 4px; color: #fff;">&lt;USR&gt;</span>
        <span style="background: #164e63; padding: 8px 12px; border-radius: 4px; color: #ddd;">What</span>
        <span style="background: #164e63; padding: 8px 12px; border-radius: 4px; color: #ddd;">is</span>
        <span style="background: #164e63; padding: 8px 12px; border-radius: 4px; color: #ddd;">the</span>
        <span style="background: #164e63; padding: 8px 12px; border-radius: 4px; color: #ddd;">color</span>
        <span style="background: #164e63; padding: 8px 12px; border-radius: 4px; color: #ddd;">of</span>
        <span style="background: #164e63; padding: 8px 12px; border-radius: 4px; color: #ddd;">the</span>
        <span style="background: #164e63; padding: 8px 12px; border-radius: 4px; color: #ddd;">sky</span>
        <span style="background: #164e63; padding: 8px 12px; border-radius: 4px; color: #ddd;">?</span>
        <span style="background: #047857; padding: 8px 12px; border-radius: 4px; color: #fff;">&lt;AST&gt;</span>
        <span style="background: #065f46; padding: 8px 12px; border-radius: 4px; color: #ddd;">Bleu</span>
        <span style="background: #065f46; padding: 8px 12px; border-radius: 4px; color: #ddd;">.</span>
      </div>
      <div style="color: #888; margin-top: 10px; font-size: 0.9em;">
        <span style="color: #a78bfa;">■</span> System  
        <span style="color: #67e8f9; margin-left: 12px;">■</span> User  
        <span style="color: #34d399; margin-left: 12px;">■</span> Assistant (generation direction →)
      </div>
    </div>
    <p style="text-align: center; color: #888; font-size: 0.9em; margin-top: -10px;">
      <em>Alt text: A left-to-right token stream with &lt;SYS&gt;, &lt;USR&gt;, &lt;AST&gt; blocks and an arrow showing generation order.</em>
    </p>
    
    <h2>How Formatting Helps Attention</h2>
    <p>Here's a toy example that's surprisingly telling. Same content, two encodings. Watch where the model's attention goes for the next assistant token:</p>
    
    <h3>With Roles → Attention Peaks at the System Boundary and User Span</h3>
    <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <div style="text-align: center; margin-bottom: 15px; color: #fff; font-weight: bold;">Attention with Explicit Roles</div>
      <div style="display: flex; flex-direction: column; gap: 2px; font-family: monospace; font-size: 0.85em;">
        <div style="display: flex; gap: 2px;">
          <div style="width: 100px; color: #888; padding: 4px;"></div>
          <div style="flex: 1; display: grid; grid-template-columns: repeat(20, 1fr); gap: 1px;">
            <div style="background: #4a1d96; padding: 4px; text-align: center; font-size: 0.7em; color: #fff;">&lt;BOS&gt;</div>
            <div style="background: #4a1d96; padding: 4px; text-align: center; font-size: 0.7em; color: #fff;">&lt;S&gt;</div>
            <div style="background: #2d1b4e; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">Always</div>
            <div style="background: #2d1b4e; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">answer</div>
            <div style="background: #2d1b4e; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">in</div>
            <div style="background: #2d1b4e; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">French</div>
            <div style="background: #2d1b4e; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">.</div>
            <div style="background: #0e7490; padding: 4px; text-align: center; font-size: 0.7em; color: #fff;">&lt;U&gt;</div>
            <div style="background: #164e63; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">What</div>
            <div style="background: #164e63; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">is</div>
            <div style="background: #164e63; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">the</div>
            <div style="background: #164e63; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">color</div>
            <div style="background: #164e63; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">of</div>
            <div style="background: #164e63; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">the</div>
            <div style="background: #164e63; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">sky</div>
            <div style="background: #164e63; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">?</div>
            <div style="background: #047857; padding: 4px; text-align: center; font-size: 0.7em; color: #fff;">&lt;A&gt;</div>
            <div style="background: #065f46; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">Bleu</div>
            <div style="background: #065f46; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">.</div>
          </div>
        </div>
      </div>
      <div style="margin-top: 10px; color: #888; font-size: 0.85em; text-align: center;">
        Notice: Strong attention (bright yellow) on &lt;SYS&gt; and &lt;USR&gt; boundary tokens
      </div>
    </div>
    
    <h3>Without Roles → Attention Diffuses Across Many Mid-Sentence Tokens</h3>
    <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <div style="text-align: center; margin-bottom: 15px; color: #fff; font-weight: bold;">Attention without Explicit Roles</div>
      <div style="display: flex; flex-direction: column; gap: 2px; font-family: monospace; font-size: 0.85em;">
        <div style="display: flex; gap: 2px;">
          <div style="width: 100px; color: #888; padding: 4px;"></div>
          <div style="flex: 1; display: grid; grid-template-columns: repeat(15, 1fr); gap: 1px;">
            <div style="background: #0e7490; padding: 4px; text-align: center; font-size: 0.7em; color: #fff;">&lt;BOS&gt;</div>
            <div style="background: #164e63; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">Always</div>
            <div style="background: #164e63; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">answer</div>
            <div style="background: #0e7490; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">in</div>
            <div style="background: #065f46; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">French</div>
            <div style="background: #164e63; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">.</div>
            <div style="background: #0e7490; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">What</div>
            <div style="background: #fbbf24; padding: 4px; text-align: center; font-size: 0.7em; color: #000;">is</div>
            <div style="background: #0e7490; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">the</div>
            <div style="background: #164e63; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">color</div>
            <div style="background: #065f46; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">of</div>
            <div style="background: #0e7490; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">the</div>
            <div style="background: #fbbf24; padding: 4px; text-align: center; font-size: 0.7em; color: #000;">sky</div>
            <div style="background: #0e7490; padding: 4px; text-align: center; font-size: 0.7em; color: #ddd;">?</div>
            <div style="background: #047857; padding: 4px; text-align: center; font-size: 0.7em; color: #fff;">&lt;AST&gt;</div>
          </div>
        </div>
      </div>
      <div style="margin-top: 10px; color: #888; font-size: 0.85em; text-align: center;">
        Attention scattered: "is", "of", "sky" get significant weight without clear role markers
      </div>
    </div>
    
    <h2>Why This Happens</h2>
    
    <p><strong>Boundary tokens as beacons.</strong> Distinct markers learn unique directions in embedding space—they're easy to retrieve. Think of them as bright lighthouses in a sea of prose.</p>
    
    <p><strong>Less guesswork.</strong> The model doesn't have to infer which earlier sentence was the rule. <code>&lt;SYS&gt;</code> is a unique island it can always find.</p>
    
    <p><strong>Stability with distance.</strong> Long context window? These anchors counter the "lost in the middle" problem. At 100k tokens, you still need to find that system prompt.</p>
    
    <h2>Training-Time View: Assistant-Only Loss</h2>
    <p>In SFT we mask labels outside the assistant span (loss = 0 on system/user + role tokens). Only the assistant's actual response gets backprop:</p>
    
    <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <div style="text-align: center; margin-bottom: 15px; color: #fff; font-weight: bold;">SFT Loss Mask: labels=1 on assistant tokens, 0 elsewhere</div>
      <div style="display: flex; flex-direction: column; gap: 8px; font-family: monospace; font-size: 0.85em;">
        <div style="display: flex; gap: 2px; flex-wrap: wrap;">
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">&lt;BOS&gt;</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">&lt;SYS&gt;</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">Always</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">answer</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">in</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">French</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">.</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">&lt;EOS_SYS&gt;</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">&lt;USR&gt;</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">What</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">is</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">the</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">color</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">of</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">the</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">sky</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">?</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">&lt;EOS_USR&gt;</span>
          <span style="background: #1e1b4b; padding: 8px 12px; border-radius: 4px; color: #666;">&lt;AST&gt;</span>
          <span style="background: #fbbf24; padding: 8px 12px; border-radius: 4px; color: #000; font-weight: bold;">Bleu</span>
          <span style="background: #fbbf24; padding: 8px 12px; border-radius: 4px; color: #000; font-weight: bold;">.</span>
        </div>
        <div style="color: #888; font-size: 0.9em; margin-top: 10px;">
          <span style="color: #4b5563;">■ Loss = 0 (masked)</span>
          <span style="color: #fbbf24; margin-left: 20px;">■ Loss = computed (assistant tokens only)</span>
        </div>
      </div>
      <p style="color: #888; font-size: 0.9em; margin-top: 15px; text-align: center;">
        Only the assistant's response ("Bleu.") contributes to the training loss
      </p>
      </div>
      
      <p>Chat formatting isn't cosmetic. Like NASA's comm protocols, it doesn't change the <em>information</em>—it changes <strong>how the system routes attention and memory</strong>.</p>
      
      <p>In a crisis—or a 50k-token prompt—that structure is the difference between noise and signal.</p>
      
      <h2>References</h2>
      <ol>
        <li>Patterson, E. S., Watts-Perotti, J., & Woods, D. D. (1999). <a href="https://www.interruptions.net/literature/Patterson-CSCW-JCC99.pdf" target="_blank" rel="noopener noreferrer">Voice Loops as Coordination Aids in Space Shuttle Mission Control</a>. <em>Computer Supported Cooperative Work</em>.</li>
        <li>NASA. (1970). <a href="https://www.nasa.gov/history/afj/ap13fj/08day3-problem.html" target="_blank" rel="noopener noreferrer">Apollo 13 Flight Journal - Day 3: The Problem</a>.</li>
        <li>Hugging Face. <a href="https://github.com/huggingface/transformers/blob/main/docs/source/en/chat_templating.md" target="_blank" rel="noopener noreferrer">Chat Templates</a>. Transformers Documentation.</li>
        <li>Hugging Face. <a href="https://huggingface.co/docs/course/en/chapter11/2" target="_blank" rel="noopener noreferrer">Chat Templates</a>. Hugging Face NLP Course.</li>
        <li>Hugging Face. <a href="https://huggingface.co/docs/trl/main/en/sft_trainer" target="_blank" rel="noopener noreferrer">SFT Trainer</a>. TRL Documentation.</li>
        <li>Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2023). <a href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noopener noreferrer">Lost in the Middle: How Language Models Use Long Contexts</a>. arXiv preprint.</li>
      </ol>
  `,
  relatedPosts: [],
};

