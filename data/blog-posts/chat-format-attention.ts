export const chatFormatAttention = {
  slug: "chat-format-attention",
  title: "Why We Format Chats: System, User, Assistant, and Lessons from Apollo 13",
  date: "November 9, 2025",
  author: "Devansh Choubey",
  category: "AI Research",
  readTime: "10 min read",
  image: "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=2000&h=1000&auto=format&fit=crop",
  content: `
    <h2>Apollo 13's Comm Loops (1970)</h2>
    <p>When an oxygen tank exploded on Apollo 13, NASA's Mission Control relied on a strict communication structure:</p>
    
    <ul>
      <li><strong>CAPCOM</strong> was the only voice to the crew.</li>
      <li><strong>Specialists</strong> (EECOM, GUIDO, etc.) debated on internal loops and routed decisions through the Flight Director.</li>
      <li>Each transmission had a clear <strong>role and priority</strong>, helping the right information reach the right people during a crisis.</li>
    </ul>
    
    <p>That structure did not change <em>what</em> was said. It changed <strong>how information was routed under pressure</strong>.</p>
    
    <p>Chat-based language models use a similar structure. A minimal version looks like this:</p>
    
    <pre><code>&lt;SYS&gt; director's notes (policies, style)
&lt;USR&gt; astronaut's question
&lt;AST&gt; ground's reply</code></pre>
    
    <p>These tags are tokens in a single sequence, but they tell the model <strong>who is speaking and which instructions belong to each role</strong>.</p>
    
    <h2>What the Format Buys Us</h2>
    
    <p><strong>Clear boundaries improve training.</strong> In supervised fine-tuning, loss is often computed only on the assistant span. Role tags make it clear where the model's response begins.</p>
    
    <p><strong>Role tokens provide landmarks.</strong> Special tokens such as <code>&lt;SYS&gt;</code> and <code>&lt;USR&gt;</code> give the model consistent boundaries to attend to, including in long prompts.</p>
    
    <p><strong>Consistent templates reduce ambiguity.</strong> Using the same template for training and production helps the model learn the structure it will encounter at inference time.</p>
    
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
    <p>Consider a simplified example with the same content encoded in two ways. The diagrams illustrate how explicit roles can give attention a clearer structure:</p>
    
    <h3>With Roles: Attention Peaks at the System Boundary and User Span</h3>
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
    
    <h3>Without Roles: Attention Diffuses Across Mid-Sentence Tokens</h3>
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
    
    <p><strong>Boundary tokens are distinctive.</strong> Repeated role markers can develop representations that make them easier for the model to identify than ordinary prose.</p>
    
    <p><strong>The model has less to infer.</strong> A <code>&lt;SYS&gt;</code> marker explicitly identifies the span containing system instructions.</p>
    
    <p><strong>Markers remain useful over long contexts.</strong> They can help the model locate important spans, although formatting alone does not solve the "lost in the middle" problem.</p>
    
    <h2>Training-Time View: Assistant-Only Loss</h2>
    <p>In a common SFT setup, labels outside the assistant span are masked, so system, user, and role tokens have a loss of zero. Only the assistant's response contributes to the gradient:</p>
    
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
      
      <p>Chat formatting is more than a presentation choice. Like NASA's communication protocols, it gives a stream of information an explicit structure.</p>
      
      <p>For a language model working through a long prompt, that structure can make instructions and conversational turns easier to distinguish.</p>
      
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
